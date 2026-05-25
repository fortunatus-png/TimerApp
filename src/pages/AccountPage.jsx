import './AccountPage.css'
import LoginPage from './LoginPage'
import Header from '../components/Header'
import { Box, Button, Typography } from '@mui/material'

function AccountPage() {
  const email = localStorage.getItem('loggedInUser');

  function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.reload();
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
              sx={{
                bgcolor: '#2D2A29',
                '&:hover': { bgcolor: '#1a1a1a' }
              }}
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