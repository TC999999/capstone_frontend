import { useParams, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import UserContext from "../UserContext";
import marketAPI from "../../api";
import "../styles/NewReview.css";

const newReview = () => {
  const initialState = { rating: "", body: "" };
  const navigate = useNavigate();
  const { username } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState(initialState);
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState("");
  const [stars, setStars] = useState("");

  const changeStars = (number) => {
    if (number >= 2 && number < 4) {
      setStars("⭐");
    } else if (number >= 4 && number < 6) {
      setStars("⭐⭐");
    } else if (number >= 6 && number < 8) {
      setStars("⭐⭐⭐");
    } else if (number >= 8 && number < 10) {
      setStars("⭐⭐⭐⭐");
    } else if (number == 10) {
      setStars("⭐⭐⭐⭐⭐");
    } else setStars("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
    if (name === "rating") {
      changeStars(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { rating, body } = formData;
    let intRating = parseInt(rating);
    try {
      await marketAPI.addReview({
        reviewedUsername: username,
        rating: intRating,
        body,
      });
      setFormData(initialState);
      navigate(`/users/${username}`);
    } catch (err) {
      setErr(true);
      setMessage(err);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <p className="loading-message">Loading...</p>;
  }

  if (!user) {
    return <h1>Please Log In First!</h1>;
  }

  return (
    <div className="new-review-page-div">
      <div className="new-review-div">
        <h1>Review for {username}</h1>
        <div className="stars-div">{stars}</div>
        <form onSubmit={handleSubmit}>
          <div className="review-form-div review-rating-div">
            <label htmlFor="rating">Rating this User out of 10: </label>
            <input
              id="rating"
              name="rating"
              type="number"
              min="1"
              max="10"
              value={formData.rating}
              onChange={handleChange}
              required
            />
          </div>
          <div className="review-form-div review-body-div">
            <textarea
              rows="10"
              cols="40"
              name="body"
              id="body"
              placeholder="type your review here"
              value={formData.body}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="button-div">
            <button className="new-review-button">Add Review!</button>
          </div>
        </form>
        {err && (
          <p>
            <i className="err-msg">{message}</i>
          </p>
        )}
      </div>
      <button className="back-button" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>
    </div>
  );
};

export default newReview;
