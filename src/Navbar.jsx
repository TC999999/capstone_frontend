import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "./UserContext";
import "./styles/Navbar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const { user, logOut } = useContext(UserContext);

  const logOutAndNavigate = () => {
    logOut();
    navigate("/");
  };

  if (!user) {
    return (
      <div className="navbar">
        <Link to="/">Home</Link>
        <Link to="/register">
          <button className="auth-button">Sign Up/Login</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/items/search/all">Search for Items</Link>
      <Link to={`/users/${user.username}/messages`}>Messages</Link>
      {user.isAdmin && <Link to="reports">Reports</Link>}
      <span>
        <Link to={`/users/${user.username}`}>{user.username}</Link>
        <button className="auth-button" onClick={logOutAndNavigate}>
          Log Out
        </button>
      </span>
    </div>
  );
};

export default NavBar;
