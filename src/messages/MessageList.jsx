import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import marketAPI from "../../api.js";
import UserContext from "../UserContext.js";
import MessageListCard from "./MessageListCard.jsx";

const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const { username } = useParams();
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState("");
  const [currPage, setCurrPage] = useState(username);

  async function getMessages() {
    try {
      let allMessages = await marketAPI.getUserMessages(username);
      setMessages(allMessages);
      setIsLoading(false);
    } catch (err) {
      setErr(true);
      setMessage(err[0]);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    if (user) {
      getMessages();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  if (username !== currPage) {
    getMessages();
    setCurrPage(username);
    setErr(false);
    setMessage("");
  }

  if (isLoading) {
    return <p className="loading-message">Loading...</p>;
  }

  if (err) {
    return <h1>{message}</h1>;
  }

  if (!user) {
    return <h1>Please Log In First!</h1>;
  }

  return (
    <div className="messages-list">
      <h1>{username}'s Messages</h1>
      {!messages.length ? (
        <i>no messages yet</i>
      ) : (
        <div className="messages-for-user">
          {messages.map((message) => {
            return (
              <MessageListCard
                key={`message-${message.messageID}`}
                message={message}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MessageList;
