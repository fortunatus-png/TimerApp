import Header from '../components/Header'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './TimerPage.css'

function TimerPage() {
  const [minutes, setMinutes] = useState(5);
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <main id="setTimerContainer">
        <div>
          <select name="timer-type" id="timer-type">
            <option value="countdown">Countdown</option>
            <option value="stopwatch">Stopwatch</option>
          </select>
        </div>
        <div className="slider">
          <label htmlFor="time-setting">{minutes} Minutes</label> <br />
          <input type="range" id="time-setting" name="time-setting" min="5" max="180" value={minutes} step="5"
            onChange={(e) => setMinutes(e.target.value)} />
        </div>
        <div>
          <button className="startTimerBtn" onClick={() => navigate('/session', { state: { minutes: minutes } })}>Start</button>
        </div>
      </main>

      <svg width="150" height="250" viewBox="0 0 150 250" style={{ display: 'block', margin: '150px auto' }}>
        {/* Kopf */}
        <circle cx="75" cy="50" r="25" fill="#F8F7F2" stroke="#003D2B" strokeWidth="2" />
        {/* Körper */}
        <ellipse cx="75" cy="130" rx="35" ry="45" fill="#F8F7F2" stroke="#003D2B" strokeWidth="2" />
        {/* Linker Arm */}
        <circle cx="20" cy="130" r="13" fill="#F8F7F2" stroke="#003D2B" strokeWidth="2" />
        {/* Rechter Arm */}
        <circle cx="130" cy="130" r="13" fill="#F8F7F2" stroke="#003D2B" strokeWidth="2" />
        {/* Linker Fuß */}
        <ellipse cx="58" cy="200" rx="15" ry="9" fill="#F8F7F2" stroke="#003D2B" strokeWidth="2" />
        {/* Rechter Fuß */}
        <ellipse cx="92" cy="200" rx="15" ry="9" fill="#F8F7F2" stroke="#003D2B" strokeWidth="2" />
        {/* Schatten */}
        <ellipse cx="75" cy="230" rx="40" ry="8" fill="#2D2A29" opacity="0.2" />
      </svg>
      <div id="backBtnContainer">
        <button id="backBtn" onClick={() => navigate('/')}>Back</button>
      </div>
    </>
  )
}

export default TimerPage;