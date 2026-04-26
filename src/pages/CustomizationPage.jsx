import { useState } from 'react'
import './CustomizationPage.css'
import Header from '../components/Header'

function CustomizationPage() {
  const [color, setColor] = useState('#4caf50');

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
    </>
  );
}

export default CustomizationPage;