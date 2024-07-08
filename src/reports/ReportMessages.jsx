import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserContext from "../UserContext.js";
import marketAPI from "../../api.js";
import ConversationCard from "../messages/ConversationCard.jsx";

const ReportMessages = () => {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const { username1, username2 } = useParams();
  const [notAdmin, setNotAdmin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function getMessages() {
      try {
        let messagesRes = await marketAPI.getMessagesForReports(
          username1,
          username2
        );
        setMessages(messagesRes);

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    if (user && user.isAdmin) {
      setNotAdmin(false);
      getMessages();
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return <p className="loading-message">Loading...</p>;
  }

  if (!user) {
    return <h1>Please Log In First!</h1>;
  }

  if (notAdmin) {
    return <h1>Only Admins can access this page!</h1>;
  }

  return (
    <div className="report-messages-div">
      <h1>
        Messages between {username1} and {username2}
      </h1>
      <button className="back-button" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>
      {messages.map((message) => {
        return (
          <ConversationCard
            key={`report-message-${message.id}`}
            message={message}
            userClass="neither-user"
            messageType="reported-messages"
          />
        );
      })}
      {!messages.length && (
        <p>
          <i>These users have not messaged each other</i>
        </p>
      )}
    </div>
  );
};

export default ReportMessages;
