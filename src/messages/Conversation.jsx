import { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import marketAPI from "../../api.js";
import UserContext from "../UserContext.js";
import ConversationCard from "./ConversationCard.jsx";
import "../styles/Conversation.css";

const Conversation = () => {
  const initialState = {
    finalPrice: "",
    exchangeMethod: "",
    address: "",
    city: "",
    regionOrState: "",
    country: "",
    zipCode: "",
  };
  const templateParams = {
    from_name: "",
    user_email: "",
    to_name: "",
    item_name: "",
  };
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
  const [formData, setFormData] = useState(initialState);
  const [emailParams, setEmailParams] = useState(templateParams);
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
        if (sellerUsername === user.username) {
          setFormData((data) => ({
            ...data,
            finalPrice: item.initialPrice,
            address: user.address,
            city: user.city,
            regionOrState: user.regionOrState,
            country: user.country,
            zipCode: user.zipCode,
          }));
        }

        let conversation = await marketAPI.getConversation(
          itemID,
          username1,
          username2
        );
        setConversation(conversation);
        if (username1 === user.username) {
          setOtherUser(username2);
          const emailRes = await marketAPI.getUserEmail(username2);
          setEmailParams((data) => ({
            ...data,
            from_name: user.username,
            user_email: emailRes.email,
            to_name: username2,
            item_name: item.name,
          }));
        } else if (username2 === user.username) {
          setOtherUser(username1);
          const emailRes = await marketAPI.getUserEmail(username1);
          setEmailParams((data) => ({
            ...data,
            from_name: user.username,
            user_email: emailRes.email,
            to_name: username1,
            item_name: item.name,
          }));
        }
        setIsLoading(false);
      } catch (err) {
        setErr(true);
        setMessage(err[0]);
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    if (user) {
      getConversation();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const getUserClass = (currentUserName, fromUsername) => {
    if (currentUserName === fromUsername) {
      return "current-user";
    } else {
      return "other-user";
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let {
        finalPrice,
        exchangeMethod,
        address,
        city,
        regionOrState,
        country,
        zipCode,
      } = formData;
      let message = {
        body: `Hello ${otherUser}, I have chosen to sell my ${itemName} to you. My address is at ${address}, ${city}, ${regionOrState}, ${country}, ${zipCode}. See you Soon!`,
      };

      let data = {
        itemID,
        buyerUsername: otherUser,
        finalPrice,
        exchangeMethod,
      };
      await marketAPI.sendMessage(itemID, otherUser, message);
      await marketAPI.sellItem(data);
      let { from_name, user_email, to_name, item_name } = emailParams;
      await marketAPI.sendNotification({
        from_name,
        user_email,
        to_name,
        item_name,
        message: message.body,
      });

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
      <button className="back-button" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>
      {sellerUser === user.username && !isSold && (
        <div className="sell-item-form">
          {" "}
          <form onSubmit={handleSubmit}>
            <div className="sell-item-form-elements-div">
              <div className="sell-inputs-div">
                <div className="sell-form-div select-exchange-method-div">
                  <select
                    id="exchangeMethod"
                    name="exchangeMethod"
                    onChange={handleChange}
                    required
                  >
                    <option key="default" value="">
                      -----Select Exchange Method Below-----
                    </option>
                    <option key="delivery" value="delivery">
                      Delivery
                    </option>
                    <option key="pickup" value="pickup">
                      Pickup
                    </option>
                  </select>
                </div>
                <div className="sell-form-div final-price-div">
                  <label htmlFor="finalPrice">Price (in $): </label>
                  <input
                    id="finalPrice"
                    type="number"
                    name="finalPrice"
                    min="0"
                    placeholder="price of item"
                    value={formData.finalPrice}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="sell-form-div  address-div">
                  <label htmlFor="address">Address: </label>
                  <input
                    id="address"
                    type="text"
                    name="address"
                    placeholder="type your address here"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="sell-form-div zipCode-div">
                  <label htmlFor="zipCode">Zipcode: </label>
                  <input
                    id="zipCode"
                    type="number"
                    name="zipCode"
                    placeholder="type your zipCode here"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="sell-form-div city-div">
                  <label htmlFor="city">City: </label>
                  <input
                    id="city"
                    type="text"
                    name="city"
                    placeholder="type your city here"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="sell-form-div regionOrState-div">
                  <label htmlFor="regionOrState">Region Or State: </label>
                  <input
                    id="regionOrState"
                    type="text"
                    name="regionOrState"
                    placeholder="type your region or state here"
                    value={formData.regionOrState}
                    onChange={handleChange}
                  />
                </div>
                <div className="sell-form-div country-div">
                  <label htmlFor="country">Country: </label>
                  <input
                    id="country"
                    type="text"
                    name="country"
                    placeholder="type your country here"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="sell-form-div sell-button-div">
                <button className="sell-item-button">
                  Sell to {otherUser}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
      {!isSold && (
        <Link to={`/messages/${otherUser}/item/${itemID}`}>
          <button className="new-message-button">Send New Message</button>
        </Link>
      )}
      <div className="conversation-message-list-div">
        {conversation.map((message) => {
          return (
            <ConversationCard
              key={`message-${message.id}`}
              message={message}
              userClass={`${getUserClass(
                user.username,
                message.from_username
              )}`}
              messageType="user-messages"
            />
          );
        })}
      </div>
    </div>
  );
};

export default Conversation;
