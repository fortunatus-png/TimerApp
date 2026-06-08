# 🚀 Study Panda App - Setup & Run Guide

## 📋 Prerequisites
- Node.js (for frontend)
- Python 3.12+ (for backend)
- Git

---

## 🎯 Quick Start (2 commands)

### Terminal 1: Start Backend
```bash
cd backend
source venv/bin/activate        # (Linux/Mac) or venv\Scripts\activate (Windows)
python -m uvicorn main:app --reload
```
Backend runs on: **http://localhost:8000**

### Terminal 2: Start Frontend
```bash
cd frontend
npm run dev
```
Frontend runs on: **http://localhost:5173**

---

## 📦 Installation (First Time Only)

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate        # (Linux/Mac) or venv\Scripts\activate (Windows)
pip install -r requirements.txt
```

### Frontend Setup
```bash
cd frontend
npm install
```

---

## ✅ API Endpoints (All Working)

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `/auth/register` | POST | ❌ | Create new account |
| `/auth/login` | POST | ❌ | Login (returns token) |
| `/auth/me` | GET | ✅ | Get current user |
| `/sessions` | GET | ✅ | Get all user sessions |
| `/sessions` | POST | ✅ | Create new session |

---

## 🔐 Security Features Implemented

✅ **Password Hashing** - Bcrypt hashing (salted & secure)  
✅ **User Isolation** - Users only see their own sessions  
✅ **Token Expiration** - Tokens expire after 24 hours  
✅ **Protected Endpoints** - All session endpoints require valid token  

---

## 🧪 How to Test

### 1. Register a New Account
- Go to http://localhost:5173/login
- Click "Sign Up"
- Enter email & password (min 8 chars)
- Click "Sign Up"

### 2. Login
- Use the same email and password
- Click "Log In"
- You'll be redirected to home page

### 3. Create Timer Session
- Go to "Timer" page
- Select duration (e.g., 25 minutes)
- Click "Start"
- Timer will save session when completed

### 4. View History
- Go to "History" page
- See heatmap of your study sessions

---

## 📁 Project Structure

```
studyApp/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── requirements.txt      # Python dependencies
│   ├── sessions.db           # SQLite database
│   ├── sessions.db.backup    # Database backup (from migration)
│   ├── migrate.py            # Database migration script
│   └── venv/                 # Virtual environment
│
├── frontend/
│   ├── src/
│   │   ├── services/api.js   # API calls to backend
│   │   ├── pages/            # Page components
│   │   ├── components/       # Reusable components
│   │   └── App.jsx           # Main app
│   ├── package.json          # Node dependencies
│   └── node_modules/         # Installed packages
│
└── README.md
```

---

## 🔧 Troubleshooting

### Backend won't start
```bash
# Make sure venv is activated
source venv/bin/activate

# Reinstall dependencies
pip install -r requirements.txt

# Check if port 8000 is in use
lsof -i :8000  # (Linux/Mac)
```

### Frontend won't connect to backend
- Make sure backend is running on http://localhost:8000
- Check browser console for errors (F12)
- Clear cache: Ctrl+Shift+Delete

### Database errors
- Database is at `backend/sessions.db`
- Backup at `backend/sessions.db.backup`
- To reset, delete `sessions.db` and restart backend

### Token expired
- Tokens expire after 24 hours
- Login again to get a new token
- This is normal and secure behavior

---

## 📚 API Usage Examples

### Register
```bash
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"SecurePass123"}'
```

### Login
```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"SecurePass123"}'
# Returns: {"message":"Login successful","email":"...","token":"..."}
```

### Create Session (with token)
```bash
curl -X POST http://localhost:8000/sessions \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"date":"2026-06-08","minutes":30,"hour":14}'
```

### Get Sessions
```bash
curl -X GET http://localhost:8000/sessions \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🎓 What You Built

✨ **Full-Stack Timer App with:**
- User authentication (register/login)
- Secure password storage (bcrypt hashing)
- Timer functionality (Pomodoro-style)
- Study session history with heatmap visualization
- Data isolation (users see only their sessions)
- Secure token-based API

**Perfect for your portfolio!** 🚀

---

## 💡 Future Enhancements (Optional)

- [ ] Logout functionality
- [ ] Change password
- [ ] Delete sessions
- [ ] Edit session details
- [ ] Statistics dashboard
- [ ] Mobile-friendly design
- [ ] Dark mode
- [ ] Share statistics

---

**Happy studying! 📚✨**
