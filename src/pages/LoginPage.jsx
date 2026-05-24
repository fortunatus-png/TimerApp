import './LoginPage.css'
import { useState } from 'react'
import { TextField, Button, Box } from '@mui/material'

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

  function signUp() {
    if (findUserByEmail(email)) {
      alert("Email already exists")
    } else {
      saveUser({ email, password });
      localStorage.setItem('loggedInUser', email);
      window.location.href = '/';
    }
  }

  function logIn() {
    if (findUser(email, password)) {
      localStorage.setItem('loggedInUser', email);
      window.location.href = '/';
    } else {
      alert("Invalid email or password")
    }
  }

  return (
    <Box id="login-wrapper">
      <Box id="login-container">
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          <Button variant="contained" onClick={signUp} fullWidth>
            Sign Up
          </Button>
          <Button variant="outlined" onClick={logIn} fullWidth>
            Log In
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default LoginPage;