import Header from '../components/Header'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './TimerPage.css'
import Figure from '../components/Figure'

function TimerPage() {
  const [minutes, setMinutes] = useState(5);
  const [mode, setMode] = useState('countdown');
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <main id="setTimerContainer">
        <div>
          <select name="timer-type" id="timer-type" onChange={(e) => setMode(e.target.value)}>
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
          <button className="startTimerBtn" onClick={() => navigate('/session', { state: { minutes: minutes, mode: mode } })}>Start</button>
        </div>
      </main>

      <Figure />
      <div id="backBtnContainer">
        <button id="backBtn" onClick={() => navigate('/')}>Back</button>
      </div>
    </>
  )
}

export default TimerPage;