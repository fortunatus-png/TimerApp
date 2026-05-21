import './LoginPage.css'
import { useState } from 'react'

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
    <>
      <div id="accountWrapper">
        <div id="accountContainer">
          <div className="inputTags">
            <label htmlFor="email">Email:</label>
            <input type="email" value={email} placeholder="Enter your email.." onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="password">Password:</label>
            <input type="password" value={password} placeholder="Enter your password.." onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <button onClick={signUp} id="signUpBtn" type="button">Sign Up</button>
            <button onClick={logIn} id="logInBtn" type="button">Log In</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;