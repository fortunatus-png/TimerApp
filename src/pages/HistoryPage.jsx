import { useState } from 'react'
import Header from '../components/Header'
import './HistoryPage.css'

function HistoryPage() {
  const sessions = JSON.parse(localStorage.getItem('sessions') || '[]');
  const [modalOpen, setModalOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [color, setColor] = useState('#4caf50');

  function getMinutesForHour(day, hour) {
    return sessions
      .filter(s =>
        new Date(s.date).getDate() === day &&
        new Date(s.date).getHours() === hour)
      .reduce((sum, s) => sum + Number(s.minutes), 0);
  }

  function handleConfirm() {
    const subjects = JSON.parse(localStorage.getItem('subjects') || '[]');
    subjects.push({ name: subject, color: color });
    localStorage.setItem('subjects', JSON.stringify(subjects));
    setSubject('');
    setColor('#4caf50');
    setModalOpen(false);
  }

  return (
    <>
      <Header />
      <h3><span>ᐊ</span> April 2026 <span>ᐅ</span></h3>
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
              {Array.from({ length: 30 }, (_, i) => {
                const day = i + 1
                return (
                  <div key={day} className="heatRow">
                    <span>{day}</span>
                    {Array.from({ length: 16 }, (_, h) => {
                      const mins = getMinutesForHour(day, h)
                      const cellColor = mins === 0 ? '#F8EBCE' :
                        mins < 20 ? '#c8e6c9' :
                          mins < 40 ? '#a8d5a2' :
                            mins < 60 ? '#4caf50' : '#1b5e20'
                      return <div key={h} className="heatCell" style={{ backgroundColor: cellColor }} />
                    })}
                  </div>
                )
              })}
            </div>

            <button id="addSubjectBtn" onClick={() => setModalOpen(true)}>+</button>
            {modalOpen && (
              <div className="modal">
                <h3 className="header">Add Subject</h3>
                <div className="inputContainer">
                  <input type="text" placeholder="Subject name" value={subject}
                    onChange={(e) => setSubject(e.target.value)} />
                  <input type="color" value={color}
                    onChange={(e) => setColor(e.target.value)} />
                </div>
                <div className="inputContainer">
                  <button id="cancelBtn" onClick={() => setModalOpen(false)}>Cancel</button>
                  <button id="confirmBtn" onClick={handleConfirm}>Confirm</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default HistoryPage;