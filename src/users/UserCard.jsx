import { Link } from "react-router-dom";
import "../styles/UserCard.css";

const UserCard = ({ user, sameUser, rating, stars }) => {
  return (
    <div className="user-card">
      <h2>
        {" "}
        <Link to={`/users/${user.username}`}>{user.username}</Link>
      </h2>

      {sameUser && (
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
      )}
      <ul>
        <li>
          <b>Status: </b> {user.isAdmin ? "Admin" : "User"}
        </li>
        <li>
          <b>Average User Rating: </b>
          {rating} {stars}
        </li>
      </ul>
    </div>
  );
};

export default UserCard;
