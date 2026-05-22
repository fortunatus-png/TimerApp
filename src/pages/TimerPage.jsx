import Header from '../components/Header'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './TimerPage.css'
import Figure from '../components/Figure'
import { Slider, Select, MenuItem, Button, Typography, Box } from '@mui/material'

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
        <Box>
          <Select value="countdown" id="timer-type" fullWidth>
            <MenuItem value="countdown">Countdown</MenuItem>
          </Select>
        </Box>

        <Box textAlign="center" mb={1}>
          <Typography variant="h5" component="span" sx={{ fontWeight: 'bold' }}>
            {minutes}
          </Typography>
          <Typography variant="h5" component="span" sx={{ fontWeight: 'bold' }}>
            {" "}Minutes
          </Typography>
        </Box>

        <Slider id="slider"
          value={minutes}
          min={5} max={180} step={5}
          onChange={(e, val) => setMinutes(val)}
          sx={{ width: '300px', display: 'block', mx: 'auto', mb: 3 }}
          valueLabelDisplay="auto"
        />

        <div>
          <Button variant="contained" onClick={startSession}>Start</Button>
        </div>
      </main>

      <Figure />
      <div id="backBtnContainer">
        <Button variant="contained" onClick={() => navigate('/')}>Back</Button>
      </div>
    </>
  )
}

export default TimerPage;