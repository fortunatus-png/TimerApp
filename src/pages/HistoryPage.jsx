import { useState } from 'react'
import Header from '../components/Header'
import './HistoryPage.css'
import { useNavigate } from 'react-router-dom'

const now = new Date();
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

function getCellColor(mins) {
  if (mins === 0) return '#F8EBCE';
  if (mins < 20) return '#c8e6c9';
  if (mins < 40) return '#a8d5a2';
  if (mins < 60) return '#4caf50';
  return '#1b5e20';
}

function HistoryPage() {
  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());
  const daysInMonth = getDaysInMonth(month, year);
  const sessions = JSON.parse(localStorage.getItem('sessions') || '[]');
  const navigate = useNavigate();

  function getMinutesForHour(day, hour) {
    return sessions
      .filter(s =>
        new Date(s.date).getDate() === day &&
        new Date(s.date).getHours() === hour &&
        new Date(s.date).getMonth() === month &&
        new Date(s.date).getFullYear() === year
      )
      .reduce((sum, s) => sum + Number(s.minutes), 0);
  }

  return (
    <>
      <h3>
        <span className="arrows" onClick={() => { if (month === 0) { setMonth(11); setYear(y => y - 1) } else setMonth(m => m - 1) }}>ᐊ</span>
        <span> </span>{MONTH_NAMES[month]} {year}<span> </span>
        <span className="arrows" onClick={() => { if (month === 11) { setMonth(0); setYear(y => y + 1) } else setMonth(m => m + 1) }}>ᐅ</span>
      </h3>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* Days Label */}
        <div className="daysLabel">Days</div>
        <div>
          {/* Hours Label */}
          <div className="hoursLabel">Hours</div>
          <div className="heatRow">
            <span></span>
            {Array.from({ length: 16 }, (_, h) => (
              <div key={h} className="heatHour">{h}</div>
            ))}
          </div>
          <div id="heatMapModalContainer">
            <div className="heatMapContainer">
              {Array.from({ length: daysInMonth }, (_, i) => {
                const day = i + 1
                return (
                  <div key={day} className="heatRow">
                    <span>{day}</span>
                    {Array.from({ length: 16 }, (_, h) => {
                      const mins = getMinutesForHour(day, h)
                      const cellColor = getCellColor(mins);
                      return <div key={h} className="heatCell" style={{ backgroundColor: cellColor }} />
                    })}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <button id="backBtn" onClick={() => navigate('/')}>Back</button>
      </div>
    </>
  );
}

export default HistoryPage;