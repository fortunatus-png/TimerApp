from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List
import sqlite3

def get_db():
    conn = sqlite3.connect('sessions.db')
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS sessions(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT NOT NULL,
            minutes INTEGER NOT NULL,
            hour INTEGER NOT NULL
        )
    ''')
    conn.commit()
    conn.close()
    
init_db()

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

class SessionCreate(BaseModel):
    date: str = Field(..., example="2026-05-28")
    minutes: int = Field(..., ge=0, example=25)
    hour: int = Field(..., ge=0, le=23, example=14)

class Session(SessionCreate):
    id: int = Field(..., example=1)

@app.get("/", summary="Welcome message")
def root():
    return {"message": "Timer Session API is ready. Use /docs for testing."}

@app.get("/sessions", summary="Get all sessions")
def get_sessions():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM sessions")
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]

@app.post("/sessions", status_code=201, summary="Create new session")
def create_session(session: SessionCreate):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO sessions (date, minutes, hour) VALUES (?, ?, ?)",
        (session.date, session.minutes, session.hour)
    )
    conn.commit()
    new_id = cursor.lastrowid
    conn.close()
    return {"id": new_id, "date": session.date, "minutes": session.minutes, "hour": session.hour}

@app.delete("/sessions/{session_id}", summary="Delete session")
def delete_session(session_id: int):
    for index, existing in enumerate(sessions):
        if existing.id == session_id:
            sessions.pop(index)
            return {"message": "Session deleted"}
    raise HTTPException(status_code=404, detail="Session not found")
