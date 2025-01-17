import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "./UserContext";
import "./styles/Navbar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const { user, logOut } = useContext(UserContext);

  //When the logout button is clicked, removes user from context and local storage
  //and removes token from local storage
  const logOutAndNavigate = () => {
    logOut();
    navigate("/");
  };

  //if user is not logged in, only show sign-up link in navbar
  if (!user) {
    return (
      <div className="navbar">
        <div className="nav-box">
          <Link to="/">Home</Link>
        </div>
        <div className="nav-box">
          <Link to="/register">
            <button className="auth-button">Sign Up/Login</button>
          </Link>
        </div>
      </div>
    );
  }

  //if user is logged in, shows item search, messages, and user profile links.
  //If user is admin, shows reports and users lists
  return (
    <div className="navbar">
      <div className="nav-box">
        <Link to="/">Home</Link>
      </div>
      <div className="nav-box">
        <Link to="/items/search/all">Search for Items</Link>
      </div>
      <div className="nav-box">
        <Link to={`/users/${user.username}/messages`}>Messages</Link>
      </div>
      {user.isAdmin && (
        <div className="nav-box">
          <Link to="/reports">Reports</Link>
        </div>
      )}
      {user.isAdmin && (
        <div className="nav-box">
          <Link to="/users">Users</Link>
        </div>
      )}
      <div className="double-nav-box">
        <span className="user-nav">
          <Link to={`/users/${user.username}`}>{user.username}</Link>
        </span>
        <button className="auth-button" onClick={logOutAndNavigate}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default NavBar;
