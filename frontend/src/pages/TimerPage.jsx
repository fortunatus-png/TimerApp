import Header from '../components/Header'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './TimerPage.css'
import Figure from '../components/Figure'
import { Slider, Button, Typography, Box, Paper } from '@mui/material'

function TimerPage() {
  const [minutes, setMinutes] = useState(5);
  const navigate = useNavigate();

  function startSession() {
    navigate('/session', { state: { minutes: minutes } });
  }

  return (
    <>
      <Header />

      <main id="setTimerContainer">
        <Paper className="countdown-box" variant="outlined">
          <Typography variant="body1" sx={{ fontWeight: 'normal', color: '#2D2A29' }}>
            Countdown
          </Typography>
        </Paper>

        <Box textAlign="center" mb={1}>
          <Typography variant="h5" component="span" sx={{ fontWeight: 'bold', color: '#2D2A29' }}>
            {minutes}
          </Typography>
          <Typography variant="h5" component="span" sx={{ fontWeight: 'bold', color: '#2D2A29' }}>
            {" "}Minutes
          </Typography>
        </Box>

        <Slider
          value={minutes}
          min={5} max={180} step={5}
          onChange={(e, val) => setMinutes(val)}
          sx={{ width: '300px', display: 'block', mx: 'auto', mb: 3 }}
          valueLabelDisplay="off"
        />

        <Box textAlign="center">
          <Button variant="contained" onClick={startSession}>Start</Button>
        </Box>
      </main>

      <Figure />
    </>
  )
}

export default TimerPage;