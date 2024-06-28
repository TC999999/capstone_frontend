const ConversationCard = ({ message }) => {
  return (
    <div className="conversation-card">
      <p>
        <b>From:</b> {message.from_username}
      </p>
      <p>
        <b>To:</b> {message.to_username}
      </p>
      <p>
        <b>About:</b> {message.item_name}
      </p>
      <p>
        <b>Body:</b> {message.body}
      </p>
      <small>
        <i>sent at:</i> {message.sent_at}
      </small>
    </div>
  );
};

export default ConversationCard;
