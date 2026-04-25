import { useState } from 'react'
import { Link } from 'react-router-dom'

function Header() {
    const [menuOpen, setMenuOpen] = useState(false)
    return (
        <header>
            <div className="counter">
                <span>★</span>
                <span>0</span>
            </div>
            <div className="menu">
                <span onClick={() => setMenuOpen(!menuOpen)}>☰</span>
            </div>

            {menuOpen && (
                <nav className="navBar">
                    <Link className="links" to="/timer">Timer</Link>
                    <Link className="links" to="/history">History</Link>
                    <Link className="links" to="/account">Account</Link>
                    <Link className="links" to="/customization">Customize</Link>
                </nav>
            )}
        </header>
    )
}

export default Header