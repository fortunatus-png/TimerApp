import './AccountPage.css'
import { useNavigate } from 'react-router-dom'
import LoginPage from './LoginPage'

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
          <div className="inputTags">
            <label>Email:</label>
            <span>{email}</span>
          </div>
          <div>
            <button onClick={logout} id="logInBtn" type="button">Log Out</button>
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