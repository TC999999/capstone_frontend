import { useParams, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import UserContext from "../UserContext";
import marketAPI from "../../api";
import "../styles/NewReport.css";

const NewReport = () => {
  const initialState = { body: "" };
  const navigate = useNavigate();
  const { username } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState(initialState);
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { body } = formData;

    try {
      await marketAPI.addReport({
        reportedUsername: username,
        body,
      });
      setFormData(initialState);
      navigate(`/users/${username}`);
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
    <div className="new-report-page-div">
      <div className="new-report-div">
        <h1>Report for {username}</h1>
        <form onSubmit={handleSubmit}>
          <div className="report-form-div report-body-div">
            <textarea
              rows="10"
              cols="50"
              name="body"
              id="body"
              placeholder="Type Your Report Here"
              value={formData.body}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="button-div">
            <button className="new-report-button">Send Report</button>
          </div>
        </form>
        {err && (
          <p>
            <i className="err-msg">{message}</i>
          </p>
        )}
      </div>
      <button className="back-button" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>
    </div>
  );
};

export default NewReport;
