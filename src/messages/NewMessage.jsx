import { useParams, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import UserContext from "../UserContext";
import marketAPI from "../../api";
import "../styles/NewMessage.css";

const NewMessage = () => {
  const initialState = { body: "" };
  const templateParams = {
    from_name: "",
    user_email: "",
    to_name: "",
    message: "",
    item_name: "",
  };
  const navigate = useNavigate();
  const { toUser, itemID } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [emailParams, setEmailParams] = useState(templateParams);
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function getEmailAndName() {
      const emailRes = await marketAPI.getUserEmail(toUser);
      const nameRes = await marketAPI.getItemName(itemID);
      setEmailParams((data) => ({
        ...data,
        from_name: user.username,
        user_email: emailRes.email,
        to_name: toUser,
        item_name: nameRes.name,
      }));
      setIsLoading(false);
    }
    setIsLoading(true);
    if (user) {
      getEmailAndName();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
    setEmailParams((data) => ({ ...data, message: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { body } = formData;
      await marketAPI.sendMessage(itemID, toUser, { body });
      await marketAPI.sendNotification(emailParams);
      setFormData(initialState);
      setEmailParams(templateParams);
      navigate(`/items/${itemID}`);
    } catch (err) {
      setErr(true);
      setMessage(err);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <p className="loading-message">Loading...</p>;
  }

  if (!user) {
    return <h1>Please Log In First!</h1>;
  }

  return (
    <div className="new-message-page-div">
      <div className="new-message-div">
        <h1>Message to {toUser}</h1>
        <form onSubmit={handleSubmit}>
          <div className="message-body-div">
            <textarea
              rows="10"
              cols="50"
              name="body"
              id="body"
              placeholder="type your message here"
              value={formData.body}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="button-div">
            <button className="send-message-button">Send Message!</button>
          </div>
        </form>
        {err && <div className="error-message">{message}</div>}
      </div>
      <button className="back-button" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>
    </div>
  );
};

export default NewMessage;
