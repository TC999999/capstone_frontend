import { Link } from "react-router-dom";
import "../styles/MessageListCard.css";

const MessageListCard = ({ message }) => {
  return (
    <div className="message-card">
      <h3>
        <Link
          to={`/messages/conversation/item/${message.itemID}/users/${message.to}/and/${message.from}`}
        >
          From: {message.from} about item {message.itemName}{" "}
        </Link>
      </h3>
      <p className="message-sent">
        <small>
          <b>Sent At: </b>
          {message.createdAt}
        </small>
      </p>
    </div>
  );
};

export default MessageListCard;
