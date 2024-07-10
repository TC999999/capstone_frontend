import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import marketAPI from "../../api";
import UserContext from "../UserContext";
import "../styles/Signup.css";

const Signup = ({ isLoading, setIsLoading }) => {
  const initialState = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    zipCode: "",
    city: "",
    regionOrState: "",
    country: "United States of America",
  };
  const { logIn } = useContext(UserContext);
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState(initialState);

  //navigator.geolocation.getGurrentPosition options
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  //gets the user's current location in longitude and latitude
  function getLocation() {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, rej, options);
    });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let position = await getLocation();
    const { latitude, longitude } = position.coords;
    const {
      username,
      password,
      firstName,
      lastName,
      email,
      address,
      zipCode,
      city,
      regionOrState,
      country,
    } = formData;
    try {
      const token = await marketAPI.signUp({
        username,
        password,
        firstName,
        lastName,
        email,
        address,
        zipCode,
        city,
        regionOrState,
        country,
        latitude,
        longitude,
      });

      logIn(username, token);
      setFormData({ ...initialState });
      navigate("/");
    } catch (err) {
      setErr(true);
      setMessage(err);
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-form">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="username-div">
          <label htmlFor="username">Username: </label>
          <input
            id="signup_username"
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
            id="signup_password"
            type="password"
            name="password"
            placeholder="type your password here"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="firstName-div">
          <label htmlFor="firstName">First Name: </label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            placeholder="type your first name here"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="lastName-div">
          <label htmlFor="lastName">Last Name: </label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            placeholder="type your last name here"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="email-div">
          <label htmlFor="email">Email: </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="type your email here"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="address-div">
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
        <div className="zipCode-div">
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
        <div className="city-div">
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
        <div className="regionOrState-div">
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
        <div className="country-div">
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
        {!isLoading ? (
          <div className="button-div">
            <button className="get-profile-button">Sign Up!</button>
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

export default Signup;
