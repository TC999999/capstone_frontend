import { useParams, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import UserContext from "./UserContext";
import marketAPI from "../api";

const NewMessage = () => {
  const initialState = { body: "" };
  const navigate = useNavigate();
  const { toUser, itemID } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { body } = formData;
    try {
      await marketAPI.sendMessage(itemID, toUser, { body });
      setFormData(initialState);
      navigate(`/items/${itemID}`);
    } catch (err) {
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
    <div className="new-message-div">
      <h1>Message to {toUser}</h1>
      <form onSubmit={handleSubmit}>
        <div className="message-body-div">
          <textarea
            rows="5"
            cols="33"
            name="body"
            id="body"
            placeholder="type your message here"
            value={formData.body}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="button-div">
          <button>Send Message!</button>
        </div>
      </form>
    </div>
  );
};

export default NewMessage;
