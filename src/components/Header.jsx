import { Toolbar, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import './Header.css';

function Header({ onNavigate }) {
    const navigate = useNavigate();

    function handleNavigation(to) {
        if (onNavigate) {
            onNavigate(to);
        } else {
            navigate(to);
        }
    }

    return (
        <header className="header">

            <Toolbar className="toolbar">

                <Typography
                    variant="h5"
                    className="logo"
                >
                    StudyFlow
                </Typography>

                <nav className="navLinks">

                    <Button
                        disableRipple
                        onClick={() =>
                            handleNavigation('/')
                        }
                    >
                        Home
                    </Button>

                    <Button
                        disableRipple
                        onClick={() =>
                            handleNavigation('/timer')
                        }
                    >
                        Timer
                    </Button>

                    <Button
                        disableRipple
                        onClick={() =>
                            handleNavigation('/history')
                        }
                    >
                        History
                    </Button>

                    <Button
                        disableRipple
                        onClick={() =>
                            handleNavigation('/account')
                        }
                    >
                        Account
                    </Button>

                    <Button
                        disableRipple
                        onClick={() =>
                            handleNavigation('/customization')
                        }
                    >
                        Customize
                    </Button>

                </nav>

            </Toolbar>

        </header>
    );
}

export default Header;