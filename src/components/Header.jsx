import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IconButton, Menu, MenuItem } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import './Header.css'

function Header({ onNavigate }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNavigation = (to) => {
        handleClose();
        if (onNavigate) {
            onNavigate(to);
        } else {
            // Fallback: normal navigation
            window.location.href = to;
        }
    };

    return (
        <header>
            <IconButton
                onClick={handleClick}
                size="large"
                sx={{ color: '#2D2A29' }}
            >
                <MenuIcon sx={{ fontSize: '3rem' }} />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={() => handleNavigation('/')}>Home</MenuItem>
                <MenuItem onClick={() => handleNavigation('/timer')}>Timer</MenuItem>
                <MenuItem onClick={() => handleNavigation('/history')}>History</MenuItem>
                <MenuItem onClick={() => handleNavigation('/account')}>Account</MenuItem>
                <MenuItem onClick={() => handleNavigation('/customization')}>Customize</MenuItem>
            </Menu>
        </header>
    );
}

export default Header;