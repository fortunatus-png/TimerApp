import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import TimerPage from './pages/TimerPage'
import SessionPage from './pages/SessionPage'
import HistoryPage from './pages/HistoryPage'
import CustomizationPage from './pages/CustomizationPage'
import AccountPage from './pages/AccountPage'
import './index.css'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    const savedColor = localStorage.getItem('bgColor');
    if (savedColor) document.body.style.backgroundColor = savedColor;
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/timer" element={<TimerPage />} />
        <Route path="/session" element={<SessionPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/customization" element={<CustomizationPage />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;