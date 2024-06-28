import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import marketAPI from "../api";
import UserContext from "./UserContext";
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
      setIsLoading(true);
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
        <ul>
          {messages.map((message) => {
            return (
              <li key={`message-${message.messageID}`}>
                <MessageListCard message={message} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MessageList;
