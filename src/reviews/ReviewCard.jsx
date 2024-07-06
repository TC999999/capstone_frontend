import { Link } from "react-router-dom";
import "../styles/ReviewCard.css";

const ReviewCard = ({ review, stars }) => {
  return (
    <div className="review-card">
      <h3>
        {" "}
        Review from
        <Link to={`/users/${review.reviewer}`}> {review.reviewer}</Link>
      </h3>
      <h2>
        {review.rating}/10 {stars}
      </h2>
      <p>{review.body}</p>
      <small>
        {" "}
        <b>Made at: </b>
        {review.createdAt}
      </small>
    </div>
  );
};

export default ReviewCard;
