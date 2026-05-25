import './LoginPage.css'
import { useState } from 'react'
import { TextField, Button, Box, Typography } from '@mui/material'

function getAllUsers() {
  return JSON.parse(localStorage.getItem('users') || '[]');
}

function saveUser(user) {
  const users = getAllUsers();
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
}

function findUser(email, password) {
  const users = getAllUsers();
  return users.find(u => u.email === email && u.password === password);
}

function findUserByEmail(email) {
  const users = getAllUsers();
  return users.find(u => u.email === email);
}

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');

  // Email validation
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@([^\s@]+\.){1,}[^\s@]{2,5}$/;
    if (!email) {
      setEmailError('Email is required');
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Enter a valid email (e.g., name@domain.com)');
      return false;
    } else if (email.length > 50) {
      setEmailError('Email must be less than 50 characters');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  }

  // Password validation
  function validatePassword(password) {
    if (!password) {
      setPasswordError('Password is required');
      return false;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return false;
    } else if (password.length > 30) {
      setPasswordError('Password must be less than 30 characters');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  }

  function handleEmailChange(e) {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (newEmail) validateEmail(newEmail);
    else setEmailError('');
  }

  function handlePasswordChange(e) {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (newPassword) validatePassword(newPassword);
    else setPasswordError('');
  }

  function signUp() {
    setGeneralError('');

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) return;

    if (findUserByEmail(email)) {
      setGeneralError('Email already exists. Please log in.');
    } else {
      saveUser({ email, password });
      localStorage.setItem('loggedInUser', email);
      window.location.href = '/';
    }
  }

  function logIn() {
    setGeneralError('');

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) return;

    if (findUser(email, password)) {
      localStorage.setItem('loggedInUser', email);
      window.location.href = '/';
    } else {
      setGeneralError('Invalid email or password');
    }
  }

  return (
    <Box id="login-wrapper">
      <Box id="login-container">
        {/* 🐼 STUDY PANDA BRANDING */}
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 'bold',
            color: '#2D2A29',
            textAlign: 'center',
            mb: 1
          }}
        >
          🐼 Study Panda
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            textAlign: 'center',
            color: '#2D2A29',
            mb: 3,
            opacity: 0.7
          }}
        >
          Track your study time, one minute at a time
        </Typography>

        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          error={!!emailError}
          helperText={emailError}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          error={!!passwordError}
          helperText={passwordError}
          fullWidth
          margin="normal"
          required
        />
        {generalError && (
          <Typography color="error" sx={{ mt: 1, textAlign: 'center' }}>
            {generalError}
          </Typography>
        )}
        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          <Button
            variant="contained"
            onClick={signUp}
            fullWidth
            sx={{ bgcolor: '#2D2A29', '&:hover': { bgcolor: '#1a1a1a' } }}
          >
            Sign Up
          </Button>
          <Button
            variant="outlined"
            onClick={logIn}
            fullWidth
            sx={{ borderColor: '#2D2A29', color: '#2D2A29' }}
          >
            Log In
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default LoginPage;