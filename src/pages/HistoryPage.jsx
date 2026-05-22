import { useState } from 'react'
import Header from '../components/Header'
import './HistoryPage.css'
import { useNavigate } from 'react-router-dom'
import { Button, Typography } from '@mui/material'

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

function isMatchingSession(session, day, hour, month, year) {
  const date = new Date(session.date);
  return date.getDate() === day &&
    date.getHours() === hour &&
    date.getMonth() === month &&
    date.getFullYear() === year;
}

function HistoryPage() {
  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());
  const daysInMonth = getDaysInMonth(month, year);
  const sessions = JSON.parse(localStorage.getItem('sessions') || '[]');
  const navigate = useNavigate();

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
    <div id="calendar-container">
      <Typography variant="h5" component="h3" textAlign="center">
        <span className="arrows" onClick={getPreviousMonth}>ᐊ</span>
        <span> </span>{MONTH_NAMES[month]} {year}<span> </span>
        <span className="arrows" onClick={getNextMonth}>ᐅ</span>
      </Typography>
      <div id="calendar-cells">
        <div className="daysLabel">Days</div>
        <div>
          <div className="hoursLabel">Hours</div>
          {renderHourLabels()}
          <div id="heatMapModalContainer">
            <div className="heatMapContainer">
              {Array.from({ length: daysInMonth }, (_, i) => renderDayRow(i + 1)
              )}
            </div>
          </div>
        </div>
        <Button variant="contained" id="backBtn" onClick={() => navigate('/')}>Back</Button>
      </div>
    </div>
  );
}

export default HistoryPage;