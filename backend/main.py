from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, EmailStr
from fastapi import Depends, Header
from typing import List
import sqlite3
import secrets
import hashlib
import bcrypt
from datetime import datetime, timedelta
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

# ========== 2. DATABASE HELPERS ==========
def get_db():
    conn = sqlite3.connect('sessions.db')
    conn.row_factory = sqlite3.Row
    return conn

# ========== PASSWORD HASHING ==========
def hash_password(password: str) -> str:
    """Hash a password using bcrypt."""
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode(), salt).decode()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a plain password against a bcrypt hash."""
    return bcrypt.checkpw(plain_password.encode(), hashed_password.encode())

def init_db():
    conn = get_db()
    
    # Sessions table - now with user_id
    conn.execute('''
        CREATE TABLE IF NOT EXISTS sessions(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            date TEXT NOT NULL,
            minutes INTEGER NOT NULL,
            hour INTEGER NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
    ''')
    
    conn.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Tokens table - now with expiration
    conn.execute('''
        CREATE TABLE IF NOT EXISTS tokens (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            token TEXT UNIQUE NOT NULL,
            user_id INTEGER NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            expires_at TIMESTAMP NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
    ''')
    
    conn.commit()
    conn.close()
    
init_db()

def save_token(user_id: int, token: str, expires_in_hours: int = 24):
    """Save a token with expiration time."""
    conn = get_db()
    cursor = conn.cursor()
    expires_at = datetime.now() + timedelta(hours=expires_in_hours)
    cursor.execute(
        "INSERT INTO tokens (token, user_id, expires_at) VALUES (?, ?, ?)",
        (token, user_id, expires_at)
    )
    conn.commit()
    conn.close()
    
def get_user_id_from_token(token: str):
    """Get user_id from valid, non-expired token."""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(
        "SELECT user_id FROM tokens WHERE token = ? AND expires_at > datetime('now')",
        (token,)
    )
    row = cursor.fetchone()
    conn.close()
    return row['user_id'] if row else None

def get_email_from_token(token: str):
    """Get email from valid, non-expired token."""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(
        "SELECT u.email FROM tokens t JOIN users u ON t.user_id = u.id WHERE t.token = ? AND t.expires_at > datetime('now')",
        (token,)
    )
    row = cursor.fetchone()
    conn.close()
    return row['email'] if row else None

def get_user_by_email(email: str):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
    user = cursor.fetchone()
    conn.close()
    return dict(user) if user else None

def create_user(email: str, password: str):
    """Create a new user with hashed password."""
    conn = get_db()
    cursor = conn.cursor()
    hashed_password = hash_password(password)
    cursor.execute(
        "INSERT INTO users (email, password) VALUES (?, ?)",
        (email, hashed_password)
    )
    conn.commit()
    user_id = cursor.lastrowid
    conn.close()
    return user_id

# ========== 3. FASTAPI APP SETUP ==========
app = FastAPI(
    title="Timer Session API",
    description="Simple FastAPI for timer sessions",
    version="0.1.0",
)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ========== 4. PYDANTIC MODELS ==========
class SessionCreate(BaseModel):
    date: str = Field(..., example="2026-05-28")
    minutes: int = Field(..., ge=0, example=25)
    hour: int = Field(..., ge=0, le=23, example=14)

class Session(SessionCreate):
    id: int = Field(..., example=1)
    
class UserCreate(BaseModel):
    email: EmailStr = Field(..., description="Valid email address")
    password: str = Field(..., min_length=8, max_length=50, description="Password (8-50 characters)")
    
class UserLogin(BaseModel):
    email: EmailStr = Field(..., description="Valid email address")
    password: str = Field(..., description="Your password")
    
# ========== 5. AUTH HELPERS ==========
security = HTTPBearer()
def generate_token(email: str):
    raw = f"{email}{secrets.token_hex(16)}"
    return hashlib.sha256(raw.encode()).hexdigest()

def verify_token(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    token = credentials.credentials

    if len(token) != 64:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    return token

# ========== 6. PUBLIC ENDPOINTS ==========    
@app.get("/", summary="Welcome message")
def root():
    return {"message": "Timer Session API is ready. Use /docs for testing."}

@app.post("/auth/register", status_code=201)
def register(user: UserCreate):
    if get_user_by_email(user.email):
        raise HTTPException(status_code=400, detail="Email already exists")
    user_id = create_user(user.email, user.password)
    return {"id": user_id, "email": user.email}

@app.post("/auth/login")
def login(user: UserLogin):
    db_user = get_user_by_email(user.email)
    if not db_user or not verify_password(user.password, db_user['password']):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = generate_token(user.email)
    save_token(db_user['id'], token)
    return {"message": "Login successful", "email": user.email, "token": token}

# ========== 7. PROTECTED ENDPOINTS ==========
@app.get("/auth/me")
def get_current_user(token: str = Depends(verify_token)):
    email = get_email_from_token(token)
    if not email:
        raise HTTPException(status_code=401, detail="Invalid token")
    return {"email": email}

@app.get("/sessions", summary="Get all sessions")
def get_sessions(token: str = Depends(verify_token)):
    user_id = get_user_id_from_token(token)
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM sessions WHERE user_id = ? ORDER BY id DESC", (user_id,))
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]

@app.post("/sessions", status_code=201, summary="Create new session")
def create_session(session: SessionCreate, token: str = Depends(verify_token)):
    user_id = get_user_id_from_token(token)
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO sessions (user_id, date, minutes, hour) VALUES (?, ?, ?, ?)",
        (user_id, session.date, session.minutes, session.hour)
    )
    conn.commit()
    new_id = cursor.lastrowid
    conn.close()
    return {"id": new_id, "date": session.date, "minutes": session.minutes, "hour": session.hour}

@app.delete("/sessions/{session_id}", summary="Delete session")
def delete_session(session_id: int, token: str = Depends(verify_token)):
    user_id = get_user_id_from_token(token)
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM sessions WHERE id = ? AND user_id = ?", (session_id, user_id))
    
    if cursor.rowcount == 0:
        conn.close()
        raise HTTPException(status_code=404, detail="Session not found")
    
    conn.commit()
    conn.close()
    return {"message": "Session deleted"}
