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
        <Box sx={{ width: '100%', maxWidth: 300, mx: 'auto', mb: 2 }}>
          <Select
            value="countdown"
            fullWidth
            IconComponent={() => null}
            sx={{ '& .MuiSelect-select': { textAlign: 'center', }, }}
          >
            <MenuItem value="countdown">Countdown</MenuItem>
          </Select>
        </Box>

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

      <div id="backBtnContainer">
        <Button variant="contained" onClick={() => navigate('/')}
        >
          Back
        </Button>
      </div>
    </>
  )
}

export default TimerPage;