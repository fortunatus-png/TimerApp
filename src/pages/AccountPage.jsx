import './AccountPage.css'
import { useNavigate } from 'react-router-dom'
import LoginPage from './LoginPage'
import { Box, Button, Typography } from '@mui/material'

function AccountPage() {
  const navigate = useNavigate();
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
      <div id="accountWrapper">
        <div id="accountContainer">
          <Box className="inputTags">
            <Typography sx={{ color: '#2D2A29', fontWeight: 'bold' }}>Email: {email}</Typography>
          </Box>
          <div>
            <Button variant="contained" onClick={logout}>Log Out</Button>
          </div>
        </div>
      </div>
      <div id="backBtnContainer">
        <Button variant="contained" onClick={() => navigate('/')}>Back</Button>
      </div>
    </>
  );
}

export default AccountPage;