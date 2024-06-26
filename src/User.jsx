import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import UserContext from "./UserContext";
import ReviewCard from "./ReviewCard.jsx";
import ItemList from "./Items.jsx";
import UserCard from "./UserCard.jsx";
import marketAPI from "../api";

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState("");
  const [reviews, setReviews] = useState([]);
  const [items, setItems] = useState([]);
  const { username } = useParams();
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [currPage, setCurrPage] = useState(username);
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState("");
  const [flaggedUser, setFlaggedUser] = useState(false);

  const getUser = async () => {
    try {
      setIsLoading(true);
      setFlaggedUser(false);
      let userRes = await marketAPI.getUserInfo(username);
      if (userRes.isFlagged) {
        setFlaggedUser(true);
      } else {
        setUserInfo(userRes);
        setReviews(userRes.reviews);
        setItems(userRes.items);
      }
      setIsLoading(false);
    } catch (err) {
      setErr(true);
      setMessage(err[0]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getUser();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  if (username !== currPage) {
    getUser();
    setCurrPage(username);
    setErr(false);
    setMessage("");
  }

  if (isLoading) {
    return <p className="loading-message">Loading...</p>;
  }

  if (!user) {
    return <h1>Please Log In First!</h1>;
  }

  if (flaggedUser) {
    return <h1>This user's account has been flagged!</h1>;
  }

  return (
    <div className="user-page">
      <div className="user-info">
        <UserCard user={userInfo} />
        {(user.username === userInfo.username || user.isAdmin) && (
          <Link to={`/users/${userInfo.username}/edit`}>Edit Profile</Link>
        )}
        {user.username !== userInfo.username && (
          <div>
            <Link to={`/users/${userInfo.username}/review`}>
              Review This User
            </Link>
            <Link to={`/users/${userInfo.username}/report`}>
              Report This User
            </Link>
          </div>
        )}
      </div>

      <div className="user-items">
        <h2>Items for Sale</h2>
        {user.username === userInfo.username && (
          <div className="add-item-button">
            <Link to={`/items/new/add`}>Add a new Item</Link>
          </div>
        )}
        <ItemList items={items} />
        {/* <ul>
          {items.map((item) => {
            return (
              <li key={`item-${item.id}`}>
                <ItemCard item={item} />
              </li>
            );
          })}
        </ul> */}
      </div>

      {user.username !== userInfo.username && (
        <div className="user-reviews">
          <h2>Reviews</h2>
          <ul>
            {reviews.map((review) => {
              return (
                <li key={`review-${review.id}`}>
                  <ReviewCard review={review} />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
