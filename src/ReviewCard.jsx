import { Link } from "react-router-dom";

const ReviewCard = ({ review }) => {
  return (
    <div className="review-card">
      <h3>
        {" "}
        Review from
        <Link to={`/users/${review.reviewer}`}> {review.reviewer}</Link>
      </h3>
      <h2>{review.rating}/10</h2>
      <p>{review.body}</p>
      <small>{review.createdAt}</small>
    </div>
  );
};

export default ReviewCard;
