import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from '../components/Header'
import './SessionPage.css'
import FigureWithBook from '../components/FigureWithBook'

function SessionPage() {
    const location = useLocation();
    const mode = location.state.mode;
    const minutes = location.state.minutes;
    const [seconds, setSeconds] = useState(mode === 'countdown' ? minutes * 60 : 0);
    const [isRunning, setIsRunning] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (seconds <= 0 && mode === 'countdown') return;
        if (!isRunning) return;
        const interval = setInterval(() => {
            setSeconds(prev => mode === 'countdown' ? prev - 1 : prev + 1)
        }, 1000);
        return () => clearInterval(interval);
    }, [seconds, isRunning, mode]);

    useEffect(() => {
        if (seconds === 0) {
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

    return (
        <>
            <Header />
            <div className="sessionContainer">
                <h1 id="timer">{formatTime(seconds)}</h1>
                <button id="sessionBtn" onClick={() => setIsRunning(!isRunning)}>{isRunning ? '⏸' : '▶'}</button>
            </div>
            <FigureWithBook />
            <div id="backBtnContainer">
                <button id="backBtn" onClick={() => navigate('/timer')}>Back</button>
            </div>
        </>
    );
}

export default SessionPage;