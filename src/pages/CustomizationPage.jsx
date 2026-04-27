import { useState } from 'react'
import './CustomizationPage.css'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'

function CustomizationPage() {
  const [color, setColor] = useState('#4caf50');
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div id="background-color-wish">
        <h3 className="customHeader">Choose your background</h3>
        <input type="color" value={color}
          onChange={(e) => {
            setColor(e.target.value);
            document.body.style.backgroundColor = e.target.value;
            localStorage.setItem('bgColor', e.target.value);
          }} />
      </div>
      <div id="backBtnContainer">
        <button id="resetBtn" onClick={() => {
          localStorage.clear()
          alert('Data cleared!')
        }}>Reset Data</button>
        <button id="backBtn" onClick={() => navigate('/')}>Back</button>
      </div>
    </>
  );
}

export default CustomizationPage;