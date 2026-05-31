import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { useEffect } from 'react'
import Sparkle from './components/Sparkle'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import TimerPage from './pages/TimerPage'
import SessionPage from './pages/SessionPage'
import HistoryPage from './pages/HistoryPage'
import CustomizationPage from './pages/CustomizationPage'
import AccountPage from './pages/AccountPage'
import LoginPage from './pages/LoginPage'

function App() {
  useEffect(() => {
    const savedColor = localStorage.getItem('bgColor');
    if (savedColor) document.body.style.backgroundColor = savedColor;
  }, []);

  return (
    <BrowserRouter>
      <Sparkle />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/timer" element={<ProtectedRoute><TimerPage /></ProtectedRoute>} />
        <Route path="/session" element={<ProtectedRoute><SessionPage /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
        <Route path="/customization" element={<ProtectedRoute><CustomizationPage /></ProtectedRoute>} />
        <Route path="/account" element={<ProtectedRoute><AccountPage /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;