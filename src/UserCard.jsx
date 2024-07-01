import { useState } from "react";
import { Link } from "react-router-dom";

const UserCard = ({ user, sameUser }) => {
  const calcRating = () => {
    if (typeof user.reviews === "object") {
      if (user.reviews.length) {
        let rating = user.reviews.reduce(function (acc, curr) {
          return acc + curr.rating;
        }, 0);
        return `${rating / user.reviews.length}/10`;
      } else {
        return "no reviews yet";
      }
    }
  };

  const [avgRate, setAvgRate] = useState(calcRating);

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
          {avgRate}
        </li>
      </ul>
    </div>
  );
};

export default UserCard;
