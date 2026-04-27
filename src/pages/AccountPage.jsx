import './AccountPage.css'
import { useNavigate } from 'react-router-dom'

function AccountPage() {
  const navigate = useNavigate();

  return (
    <>
      <div id="accountWrapper">
        <div id="accountContainer">
          <div className="inputTags">
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" placeholder="Enter your email.." />
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" placeholder="Enter your password.." />
          </div>
          <div>
            <button id="signUpBtn" type="button">Sign Up</button>
            <button id="logInBtn" type="button">Log In</button>
          </div>
          <div>
            <a href="#">Forgot Password Link?</a>
          </div>
        </div>
      </div>
      <div id="backBtnContainer">
        <button id="backBtn" onClick={() => navigate('/')}>Back</button>
      </div>
    </>
  );
}

export default AccountPage;