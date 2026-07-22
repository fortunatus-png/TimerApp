import { useState, useEffect } from 'react'
import Header from '../components/Header'
import './HistoryPage.css'
import { Button, Typography, IconButton } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { fetchSessions } from '../services/api'

const now = new Date();
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

function getCellColor(mins) {
  if (mins === 0) return 'rgb(248, 235, 206)';  // #F8EBCE
  if (mins < 20) return 'rgb(200, 230, 201)';  // #c8e6c9
  if (mins < 40) return 'rgb(168, 213, 162)';  // #a8d5a2
  if (mins < 60) return 'rgb(76, 175, 80)';    // #4caf50
  return 'rgb(27, 94, 32)';                     // #1b5e20
}

function isMatchingSession(session, day, hour, month, year) {
  const date = new Date(session.date);
  return date.getDate() === day &&
    session.hour === hour &&
    date.getMonth() === month &&
    date.getFullYear() === year;
}

function HistoryPage() {
  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());
  const daysInMonth = getDaysInMonth(month, year);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSessions()
      .then(data => { setSessions(data); setLoading(false); })
      .catch(error => {
        console.error('Error fetching sessions:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <div className="loading-container">
          <p>Loading sessions...</p>
        </div>
      </>
    );
  }

  function getMinutesForHour(day, hour) {
    return sessions
      .filter(s => isMatchingSession(s, day, hour, month, year))
      .reduce((sum, s) => sum + Number(s.minutes), 0);
  }

  function renderHeatmapCell(day, hour) {
    const mins = getMinutesForHour(day, hour);
    return <div key={hour} className="heatCell" style={{ backgroundColor: getCellColor(mins) }} />;
  }

  function renderHourLabels() {
    return (
      <div className="heatRow">
        <span></span>
        {Array.from({ length: 24 }, (_, h) => (
          <div key={h} className="heatHour">{h}</div>
        ))}
      </div>
    );
  }

  function renderDayRow(day) {
    return (
      <div key={day} className="heatRow">
        <span>{day}</span>
        {Array.from({ length: 24 }, (_, hour) => renderHeatmapCell(day, hour))}
      </div>
    );
  }

  function getPreviousMonth() {
    if (month === 0) {
      setMonth(11);
      setYear(y => y - 1);
    } else {
      setMonth(m => m - 1);
    }
  }

  function getNextMonth() {
    if (month === 11) {
      setMonth(0);
      setYear(y => y + 1);
    } else {
      setMonth(m => m + 1);
    }
  }

  return (
    <div id="history-page">
      <Header />

      <div id="calendar-wrapper">
        <div id="month-navigation">
          <IconButton id="prevBtn" onClick={getPreviousMonth} sx={{ color: '#2D2A29' }}>
            <ChevronLeftIcon />
          </IconButton>
          <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', color: '#2D2A29' }}>
            {MONTH_NAMES[month]} {year}
          </Typography>
          <IconButton id="nextBtn" onClick={getNextMonth} sx={{ color: '#2D2A29' }}>
            <ChevronRightIcon />
          </IconButton>
        </div>

        <div id="heatmap-wrapper">
          <div className="daysLabel">Days</div>
          <div>
            <div className="hoursLabel">Hours</div>
            {renderHourLabels()}
            <div id="heatMapModalContainer">
              <div className="heatMapContainer">
                {Array.from({ length: daysInMonth }, (_, i) => renderDayRow(i + 1))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryPage;