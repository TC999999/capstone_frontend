import { Link } from "react-router-dom";
import "../styles/ConversationCard.css";

const ConversationCard = ({ message, userClass, messageType }) => {
  return (
    <div className={`conversation-card-div ${userClass}-div`}>
      <div className={`conversation-card ${userClass} ${messageType}`}>
        <p>
          <b>From:</b>{" "}
          <Link to={`/users/${message.from_username}`}>
            {message.from_username}
          </Link>
        </p>
        <p>
          <b>To:</b>{" "}
          <Link to={`/users/${message.to_username}`}>
            {message.to_username}
          </Link>
        </p>
        <p>
          <b>About:</b>{" "}
          <Link to={`/items/${message.itemID}`}> {message.item_name}</Link>
        </p>
        <p>
          <b>Body:</b> {message.body}
        </p>
        <small>
          <i>sent at:</i> {message.sent_at}
        </small>
      </div>
    </div>
  );
};

export default ConversationCard;
