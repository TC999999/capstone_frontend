import "../styles/UserListCard.css";
import { Link } from "react-router-dom";

const UserListCard = ({ user }) => {
  return (
    <div className="user-list-card">
      <h2>
        {" "}
        <Link to={`/users/${user.username}`}>{user.username}</Link>
      </h2>
      <ul>
        <li>
          <b>First Name: </b> {user.firstName}
        </li>
        <li>
          <b>Last Name: </b> {user.lastName}
        </li>
        <li>
          <b>Email Address: </b> {user.email}
        </li>
      </ul>
      <ul>
        <li>
          <b>Admin Status: </b> {user.isAdmin ? "Admin" : "User"}
        </li>
        <li>
          <b>Flag Status: </b> {user.isFlagged ? "Flagged" : "Not Flagged"}
        </li>
      </ul>
    </div>
  );
};

export default UserListCard;
