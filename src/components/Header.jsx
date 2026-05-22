import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IconButton, Menu, MenuItem, Box } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import './Header.css'

function Header() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <header>
            <IconButton
                onClick={handleClick}
                size="large"
                className="menu-icon-button"
            >
                <MenuIcon />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                className="custom-menu"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={handleClose} component={Link} to="/" className="custom-menu-item">
                    Home
                </MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/timer" className="custom-menu-item">
                    Timer
                </MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/history" className="custom-menu-item">
                    History
                </MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/account" className="custom-menu-item">
                    Account
                </MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/customization" className="custom-menu-item">
                    Customize
                </MenuItem>
            </Menu>
        </header>
    );
}

export default Header;