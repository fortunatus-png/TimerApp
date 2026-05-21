import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import Header from '../components/Header'
import './SessionPage.css'
import FigureWithBook from '../components/FigureWithBook'

function SessionPage() {
    const location = useLocation();
    const { minutes } = location.state;
    const [seconds, setSeconds] = useState(minutes * 60);
    const [isRunning, setIsRunning] = useState(true);
    const [showLeaveWarning, setShowLeaveWarning] = useState(false);
    const hasSaved = useRef(false);
    const navigate = useNavigate();

    // Time-Logik
    useEffect(() => {
        if (seconds <= 0 || !isRunning) return;
        const interval = setInterval(() => {
            setSeconds(prev => prev - 1)
        }, 1000);
        return () => clearInterval(interval);
    }, [seconds, isRunning]);

    useEffect(() => {
        if (seconds === 0 && !hasSaved.current) {
            hasSaved.current = true;
            const session = {
                date: new Date().toISOString(),
                minutes: minutes,
                hour: new Date().getHours()
            };
            const history = JSON.parse(localStorage.getItem('sessions') || '[]');
            history.push(session);
            localStorage.setItem('sessions', JSON.stringify(history));
        }
    }, [seconds, minutes]);

    function formatTime(sec) {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    }

    function leaveSession() {
        const elapsed = minutes * 60 - seconds;
        const elapsedMinutes = Math.floor(elapsed / 60);
        if (elapsedMinutes > 0) {
            const history = JSON.parse(localStorage.getItem('sessions') || '[]');
            history.push({
                date: new Date().toISOString(),
                minutes: elapsedMinutes,
                hour: new Date().getHours()
            });
            localStorage.setItem('sessions', JSON.stringify(history));
        }
        navigate('/timer');
    }

    return (
        <>
            <Header />
            <div className="sessionContainer">
                <h1 id="timer">{formatTime(seconds)}</h1>
                <button id="sessionBtn" onClick={() => setIsRunning(!isRunning)}>
                    {seconds === 0 ? '▶' : isRunning ? '⏸' : '▶'}
                </button>
                {/*Congratulations message when countdown ends */}
                {seconds === 0 && (
                    <div className='congratsMessage'>
                        <h2>🎉 Great job!</h2>
                        <p>You studied for {minutes} minutes!</p>
                        <button onClick={() => navigate('/timer')}>Start new session</button>
                    </div>
                )}
                {/*Warning modal when user tries to leave */}
                {showLeaveWarning && (
                    <div className="warningModal">
                        <p>Your progress so far will be saved, but you won't be able to continue this session later.</p>
                        <div className="btnContainer">
                            <button onClick={() => {
                                setShowLeaveWarning(false); setIsRunning(true);
                            }}>Continue</button>
                            <button onClick={leaveSession}>Leave</button>
                        </div>
                    </div>
                )}
            </div>

            <FigureWithBook />
            <div id="backBtnContainer">
                {!showLeaveWarning && seconds > 0 && (
                    <button id="backBtn" onClick={() => {
                        setIsRunning(false); setShowLeaveWarning(true);
                    }}>Back</button>
                )}
            </div>
        </>
    );
}

export default SessionPage;