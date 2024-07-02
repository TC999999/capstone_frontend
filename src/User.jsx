import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import UserContext from "./UserContext";
import ReviewCard from "./ReviewCard.jsx";
import ItemList from "./Items.jsx";
import UserCard from "./UserCard.jsx";
import PurchaseCard from "./UserPurchasesCard.jsx";
import marketAPI from "../api";

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState("");
  const [reviews, setReviews] = useState([]);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState("");
  const [flaggedUser, setFlaggedUser] = useState(false);
  const [reports, setReports] = useState([]);
  const [userReported, setUserReported] = useState(false);
  const { username } = useParams();
  const [currPage, setCurrPage] = useState(username);
  const { user } = useContext(UserContext);
  const [sameUser, setSameUser] = useState(false);
  const [purchases, setPurchases] = useState([]);

  const getUser = async () => {
    try {
      setFlaggedUser(false);
      let userRes = await marketAPI.getUserInfo(username);
      if (userRes.isFlagged && !user.isAdmin) {
        setFlaggedUser(true);
      } else {
        setUserInfo(userRes);
        if (userRes.username === user.username) {
          setSameUser(true);
          setPurchases(userRes.pastPurchases);
        }
        setReviews(userRes.reviews);
        setItems(userRes.items);
        setReports(userRes.reports);

        let userReported = userRes.reports.some(function (report) {
          return report.reporter === user.username;
        });
        setUserReported(userReported);
      }
      setIsLoading(false);
    } catch (err) {
      setErr(true);
      setMessage(err[0]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (user) {
      getUser();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const changeAdminStatus = async () => {
    try {
      const data = { isAdmin: !userInfo.isAdmin };
      await marketAPI.updateUser(userInfo.username, data);
      getUser();
    } catch (err) {
      setIsLoading(false);
    }
  };

  const changeFlagStatus = async () => {
    try {
      const data = { isFlagged: !userInfo.isFlagged };
      await marketAPI.updateUser(userInfo.username, data);
      getUser();
    } catch (err) {
      setIsLoading(false);
    }
  };

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

  if (err) {
    return <h1>{message}</h1>;
  }

  return (
    <div className="user-page">
      <div className="user-info">
        <UserCard user={userInfo} sameUser={sameUser} />
        {user.username === userInfo.username && (
          <Link to={`/users/${userInfo.username}/edit`}>Edit Profile</Link>
        )}
        {user.username !== userInfo.username && !userInfo.isFlagged && (
          <div>
            <Link to={`/users/${userInfo.username}/review`}>
              Review This User
            </Link>
            <Link to={`/users/${userInfo.username}/report`}>
              Report This User
            </Link>
          </div>
        )}

        {user.username !== userInfo.username &&
          user.isAdmin &&
          !userInfo.isFlagged && (
            <div className="change-admin-status">
              <form onSubmit={changeAdminStatus}>
                <button>Change Admin Status</button>
              </form>
            </div>
          )}

        {user.username !== userInfo.username &&
          user.isAdmin &&
          reports.length > 0 &&
          !userReported && (
            <div className="change-admin-status">
              <form onSubmit={changeFlagStatus}>
                <button>Change Flag Status</button>
              </form>
            </div>
          )}
      </div>

      <div className="user-reviews">
        <h2>Reviews</h2>
        {reviews.length ? (
          <ul>
            {reviews.map((review) => {
              return (
                <li key={`review-${review.reviewID}`}>
                  <ReviewCard review={review} />
                </li>
              );
            })}
          </ul>
        ) : (
          <p>
            <i>No Reviews Yet!</i>
          </p>
        )}
      </div>

      <div className="user-items">
        <h2>Items for Sale</h2>
        {user.username === userInfo.username && (
          <div className="add-item-button">
            <Link to={`/items/new/add`}>Add a new Item</Link>
          </div>
        )}
        {items.length ? (
          <ItemList items={items} />
        ) : (
          <p>
            <i>No Items Yet!</i>
          </p>
        )}
      </div>

      {(user.username === userInfo.username || user.isAdmin) && (
        <div className="user-purchases">
          <h2>Past Purchases</h2>
          {purchases.length ? (
            <ul>
              {purchases.map((purchase) => {
                return (
                  <li key={`purchase-${purchase.purchaseID}`}>
                    <PurchaseCard item={purchase} />
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>
              <i>No Purchases Yet!</i>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
