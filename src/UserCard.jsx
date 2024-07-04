import { Link } from "react-router-dom";

const UserCard = ({ user, sameUser, rating }) => {
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
          {rating}
        </li>
      </ul>
    </div>
  );
};

export default UserCard;
