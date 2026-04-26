import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <header>
            <div id="counter">
                <span>★</span>
                <span>0</span>
            </div>
            <div id="hamburger-menu">
                <span onClick={() => setMenuOpen(!menuOpen)}>☰</span>
            </div>

            {menuOpen && (
                <nav id="menuItems">
                    <Link className="links" to="/">Home</Link>
                    <Link className="links" to="/timer">Timer</Link>
                    <Link className="links" to="/history">History</Link>
                    <Link className="links" to="/account">Account</Link>
                    <Link className="links" to="/customization">Customize</Link>
                </nav>
            )}
        </header>
    );
}

export default Header;