import { useParams, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import UserContext from "./UserContext";
import marketAPI from "../api";

const newReview = () => {
  const initialState = { rating: "", body: "" };
  const navigate = useNavigate();
  const { username } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
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
    <div className="new-review-div">
      <h1>Review for {username}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="rating"></label>
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
        <div className="review-body-div">
          <textarea
            rows="5"
            cols="33"
            name="body"
            id="body"
            placeholder="type your review here"
            value={formData.body}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="button-div">
          <button>Add Review!</button>
        </div>
      </form>
    </div>
  );
};

export default newReview;
