import './LoginPage.css'
import { useState } from 'react'
import { TextField, Button } from '@mui/material'

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
    <div id="accountWrapper">
      <div id="accountContainer">
        <div className="input-container">
          <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
          <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth />
        </div>
        <div>
          <Button onClick={signUp} variant="contained">Sign Up</Button>
          <Button onClick={logIn} variant="contained">Log In</Button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;