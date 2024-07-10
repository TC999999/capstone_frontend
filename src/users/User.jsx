import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import UserContext from "../UserContext.js";
import ReviewCard from "../reviews/ReviewCard.jsx";
import ItemList from "../items/Items.jsx";
import UserCard from "./UserCard.jsx";
import PurchaseCard from "./UserPurchasesCard.jsx";
import marketAPI from "../../api.js";
import "../styles/User.css";

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
  const [rating, setRating] = useState("no reviews yet");
  const [stars, setStars] = useState("");

  const getStars = (number) => {
    if (number >= 2 && number < 4) {
      return "⭐";
    } else if (number >= 4 && number < 6) {
      return "⭐⭐";
    } else if (number >= 6 && number < 8) {
      return "⭐⭐⭐";
    } else if (number >= 8 && number < 10) {
      return "⭐⭐⭐⭐";
    } else if (number == 10) {
      return "⭐⭐⭐⭐⭐";
    } else {
      return "";
    }
  };

  const calcRating = (revArr) => {
    if (revArr.length) {
      let rating = revArr.reduce(function (acc, curr) {
        return acc + curr.rating;
      }, 0);

      return `${rating / revArr.length}`;
    } else {
      return "no reviews yet";
    }
  };

  const getUser = async () => {
    try {
      setFlaggedUser(false);
      let userRes = await marketAPI.getUserInfo(username);
      if (userRes.isFlagged && !user.isAdmin) {
        setFlaggedUser(true);
      } else {
        let {
          username,
          isAdmin,
          isFlagged,
          items,
          reviews,
          reports,
          pastPurchases,
          firstName,
          lastName,
          email,
        } = userRes;
        setUserInfo({ username, isAdmin, isFlagged, items, reviews, reports });
        if (userRes.username === user.username) {
          setSameUser(true);
          setUserInfo((data) => ({
            ...data,
            firstName,
            lastName,
            email,
            pastPurchases,
          }));
          setPurchases(userRes.pastPurchases);
        } else {
          setSameUser(false);
          if (user.isAdmin) {
            setPurchases(userRes.pastPurchases);
          } else {
            setPurchases([]);
          }
        }
        setReviews(userRes.reviews);
        let rating = calcRating(userRes.reviews);
        setRating(`${rating}`);
        let stars = getStars(rating / userRes.reviews.length);
        setStars(stars);
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
      await marketAPI.updateUserAdminOnly(userInfo.username, data);
      getUser();
    } catch (err) {
      setIsLoading(false);
    }
  };

  const changeFlagStatus = async () => {
    try {
      const data = { isFlagged: !userInfo.isFlagged };
      await marketAPI.updateUserAdminOnly(userInfo.username, data);
      getUser();
    } catch (err) {
      setIsLoading(false);
    }
  };

  //if the username in the url changes, so does the page
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
    return <h1 className="err-msg">This user's account has been flagged!</h1>;
  }

  if (err) {
    return <h1>{message}</h1>;
  }

  return (
    <div className="user-page">
      <div className="user-info">
        <UserCard
          user={userInfo}
          sameUser={sameUser}
          rating={rating}
          stars={stars}
        />
        {user.username === userInfo.username && (
          <Link to={`/users/${userInfo.username}/edit`}>
            <button className="edit-user-button">Edit Profile</button>
          </Link>
        )}

        {user.username === userInfo.username && user.isAdmin && (
          <Link to={`/items/type/new`}>
            <button className="add-item-type-button">Add New Item Type</button>
          </Link>
        )}

        <div className="buttons-div">
          {user.username !== userInfo.username && !userInfo.isFlagged && (
            <div className="review-user-button-div">
              <Link to={`/users/${userInfo.username}/review`}>
                <button className="review-user-button">Review This User</button>
              </Link>
            </div>
          )}

          {user.username !== userInfo.username && !userInfo.isFlagged && (
            <div className="report-user-button-div">
              <Link to={`/users/${userInfo.username}/report`}>
                <button className="report-user-button">
                  {" "}
                  Report This User
                </button>
              </Link>
            </div>
          )}

          {user.username !== userInfo.username &&
            user.isAdmin &&
            !userInfo.isFlagged && (
              <div className="change-admin-status">
                <button
                  className="admin-status-button"
                  onClick={() => changeAdminStatus()}
                >
                  Change Admin Status
                </button>
              </div>
            )}

          {user.username !== userInfo.username &&
            user.isAdmin &&
            reports.length > 0 &&
            !userReported && (
              <div className="change-flag-status">
                <button
                  className="flag-status-button"
                  onClick={() => changeFlagStatus()}
                >
                  Change Flag Status
                </button>
              </div>
            )}
        </div>
      </div>

      <div className="user-reviews">
        <h2>Reviews</h2>
        {reviews.length ? (
          <div className="user-reviews-list">
            {reviews.map((review) => {
              return (
                <ReviewCard
                  key={`review-${review.reviewID}`}
                  review={review}
                  stars={getStars(review.rating)}
                />
              );
            })}
          </div>
        ) : (
          <p>
            <i>No Reviews Yet!</i>
          </p>
        )}
      </div>

      <div className="user-items">
        <h2>Items for Sale</h2>
        {user.username === userInfo.username && (
          <div className="add-item-button-div">
            <Link to={`/items/new/add`}>
              {" "}
              <button className="add-item-button">Add a new Item</button>
            </Link>
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
            <div className="user-purchases-list">
              {purchases.map((purchase) => {
                return (
                  <PurchaseCard
                    key={`purchase-${purchase.purchaseID}`}
                    item={purchase}
                  />
                );
              })}
            </div>
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
