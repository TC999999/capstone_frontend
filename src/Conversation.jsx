import { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import marketAPI from "../api";
import UserContext from "./UserContext";
import ConversationCard from "./ConversationCard.jsx";

const Conversation = () => {
  const { user } = useContext(UserContext);
  const [itemName, setItemName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [otherUser, setOtherUser] = useState("");
  const [sellerUser, setSellerUser] = useState("");
  const { itemID, username1, username2 } = useParams();
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState("");
  const [isSold, setIsSold] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getConversation() {
      try {
        setIsLoading(true);
        let item = await marketAPI.getItemById(itemID);
        if (item.isSold) {
          setIsSold(true);
        }
        setItemName(item.name);
        let sellerUsername = await marketAPI.getItemSeller(itemID);
        setSellerUser(sellerUsername);

        let conversation = await marketAPI.getConversation(
          itemID,
          username1,
          username2
        );
        setConversation(conversation);
        if (username1 === user.username) {
          setOtherUser(username2);
        } else if (username2 === user.username) {
          setOtherUser(username1);
        }
        setIsLoading(false);
      } catch (err) {
        setErr(true);
        setMessage(err[0]);
        setIsLoading(false);
      }
    }

    if (user) {
      getConversation();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let message = {
        body: `Hello ${otherUser}, I have chosen to sell my ${itemName} to you. My address is at ${user.address}, ${user.city}, ${user.regionOrState}, ${user.country}, ${user.zipCode}. See you Soon!`,
      };
      await marketAPI.sendMessage(itemID, otherUser, message);
      await marketAPI.sellItem(itemID, otherUser);
      setIsLoading(false);
      navigate(`/users/${user.username}/messages`);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

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
    <div className="conversation-div">
      {!isSold && (
        <Link to={`/messages/${otherUser}/item/${itemID}`}>
          Send New Message
        </Link>
      )}
      {sellerUser === user.username && !isSold && (
        <div className="sell-item-button">
          {" "}
          <form onSubmit={handleSubmit}>
            <button>Sell to {otherUser}</button>
          </form>
        </div>
      )}
      {conversation.map((message) => {
        return (
          <ConversationCard key={`message-${message.id}`} message={message} />
        );
      })}
    </div>
  );
};

export default Conversation;
