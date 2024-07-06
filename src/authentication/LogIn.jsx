import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import marketAPI from "../../api";
import UserContext from "../UserContext";
import "../styles/Login.css";

const Login = ({ isLoading, setIsLoading }) => {
  const initialState = {
    username: "",
    password: "",
  };
  const { logIn } = useContext(UserContext);
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(false);
    setMessage("");
    setIsLoading(true);
    const { username, password } = formData;
    try {
      const token = await marketAPI.logIn({
        username,
        password,
      });

      logIn(username, token);
      setFormData(initialState);
      navigate("/");
    } catch (err) {
      setErr(true);
      setMessage(err);
      setIsLoading(false);
    }
  };

  return (
    <div className="login-form">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <div className="username-div">
          <label htmlFor="username">Username: </label>
          <input
            id="login_username"
            type="text"
            name="username"
            placeholder="type your username here"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="password-div">
          <label htmlFor="password">Password: </label>
          <input
            id="login_password"
            type="password"
            name="password"
            placeholder="type your password here"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {!isLoading ? (
          <div className="button-div">
            <button className="get-profile-button">Log In!</button>
          </div>
        ) : (
          <div>
            <p>Loading...</p>
          </div>
        )}
      </form>
      {err && <p className="err-msg">{message}</p>}
    </div>
  );
};

export default Login;
