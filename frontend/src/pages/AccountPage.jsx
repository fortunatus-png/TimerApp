import './AccountPage.css'
import LoginPage from './LoginPage'
import Header from '../components/Header'
import { Box, Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser } from '../services/api'

function AccountPage() {
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }

    getCurrentUser()
      .then(data => { setEmail(data.email); setLoading(false); })
      .catch(() => { navigate('/login'); });
  }, [navigate]);

  function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('loggedInUser');
    window.location.href = '/login';
  }

  if (loading) {
    return (
      <>
        <Header />
        <div id="accountWrapper">
          <div id="accountContainer">
            <Typography>Loading...</Typography>
          </div>
        </div>
      </>
    );
  }

  if (!email) {
    return <LoginPage />;
  }

  return (
    <>
      <Header />
      <div id="accountWrapper">
        <div id="accountContainer">
          <Box className="inputTags" sx={{ mb: 3 }}>
            <Typography sx={{ color: '#2D2A29', fontWeight: 'bold' }}>
              Email: {email}
            </Typography>
          </Box>
          <div>
            <Button
              variant="contained"
              onClick={logout}
              sx={{ bgcolor: '#2D2A29', '&:hover': { bgcolor: '#1a1a1a' } }}
            >
              Log Out
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountPage;
