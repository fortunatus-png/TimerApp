import { useState } from 'react'
import './CustomizationPage.css'
import Header from '../components/Header'
import Button from '@mui/material/Button'

function CustomizationPage() {
  const [color, setColor] = useState('#4caf50');

  function changeBackgroundColor(e) {
    setColor(e.target.value);
    document.body.style.backgroundColor = e.target.value;
    localStorage.setItem('bgColor', e.target.value);
  }

  function resetBackgroundColor() {
    localStorage.removeItem('bgColor');
    document.body.style.backgroundColor = '#4caf50';
    setColor('#4caf50');
  }

  return (
    <>
      <Header />
      <div id="background-color-wish">
        <h4 className="customHeader">Choose your background</h4>
        <input type="color" value={color} onChange={changeBackgroundColor} />
      </div>
      <div id="btnContainer">
        <Button variant="contained" id="resetBtn" onClick={resetBackgroundColor}>Reset Data</Button>
      </div>
    </>
  );
}

export default CustomizationPage;