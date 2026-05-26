import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import Header from '../components/Header'
import './SessionPage.css'
import FigureWithBook from '../components/FigureWithBook'
import { Button, Typography } from '@mui/material'

function SessionPage() {
    const location = useLocation();
    const { minutes } = location.state;
    const [seconds, setSeconds] = useState(minutes * 60);
    const [isRunning, setIsRunning] = useState(true);
    const [showLeaveWarning, setShowLeaveWarning] = useState(false);
    const hasSaved = useRef(false);
    const navigate = useNavigate();

    // Timer Logic
    useEffect(() => {
        if (seconds <= 0 || !isRunning) return;
        const interval = setInterval(() => {
            setSeconds(prev => prev - 1)
        }, 1000);
        return () => clearInterval(interval);
    }, [seconds, isRunning]);

    // Save session when timer reaches 0
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

    function savePartialSession() {
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
    }

    function handleHeaderNavigation(to) {
        if (seconds > 0 && !showLeaveWarning) {
            setIsRunning(false);
            setShowLeaveWarning(true);
            window.pendingNavigation = to;
        } else {
            navigate(to);
        }
    }

    function leaveSessionAndNavigate() {
        savePartialSession();

        if (window.pendingNavigation) {
            const destination = window.pendingNavigation;
            window.pendingNavigation = null;
            navigate(destination);
        } else {
            navigate('/timer');
        }
    }

    function handleContinue() {
        setShowLeaveWarning(false);
        setIsRunning(true);
        window.pendingNavigation = null;
    }

    return (
        <>
            <Header onNavigate={handleHeaderNavigation} />

            <div className="sessionContainer">
                <Typography variant="h1" component="h1" sx={{ fontSize: '5rem', fontWeight: 'bold', color: '#2D2A29' }}>
                    {formatTime(seconds)}
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => setIsRunning(!isRunning)}
                    sx={{ bgcolor: '#2D2A29', '&:hover': { bgcolor: '#1a1a1a' } }}
                >
                    {seconds === 0 ? '▶' : isRunning ? '⏸' : '▶'}
                </Button>

                {seconds === 0 && (
                    <div className='congratsMessage'>
                        <h2>🎉 Great job!</h2>
                        <p>You studied for {minutes} minutes!</p>
                        <Button
                            variant="contained"
                            onClick={() => navigate('/timer')}
                            sx={{ bgcolor: '#2D2A29' }}
                        >
                            Start new session
                        </Button>
                    </div>
                )}

                {showLeaveWarning && (
                    <div className="warningModal">
                        <p>Your progress so far will be saved, but you won't be able to continue this session later.</p>
                        <div className="btnContainer">
                            <Button
                                variant="outlined"
                                onClick={handleContinue}
                                sx={{ borderColor: '#2D2A29', color: '#2D2A29' }}
                            >
                                Continue
                            </Button>
                            <Button
                                variant="contained"
                                onClick={leaveSessionAndNavigate}
                                sx={{ bgcolor: '#2D2A29' }}
                            >
                                Leave
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            <FigureWithBook />

            <div id="backBtnContainer">
                {!showLeaveWarning && seconds > 0 && (
                    <Button
                        variant="contained"
                        onClick={() => { setIsRunning(false); setShowLeaveWarning(true); }}
                    >
                        Back
                    </Button>
                )}
            </div>
        </>
    );
}

export default SessionPage;