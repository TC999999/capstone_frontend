import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import marketAPI from "../api";
import UserContext from "./UserContext";

const UserEdit = () => {
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    zipCode: "",
    city: "",
    regionOrState: "",
    country: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const { user, updateUser } = useContext(UserContext);
  const { username } = useParams();
  const navigate = useNavigate();
  const [userErr, setUserErr] = useState(false);
  const [subErr, setSubErr] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getUser = async () => {
      try {
        setIsLoading(true);
        let userRes = await marketAPI.getUserInfo(username);
        let {
          firstName,
          lastName,
          email,
          address,
          zipCode,
          city,
          regionOrState,
          country,
        } = userRes;
        setFormData((f) => ({
          ...f,
          firstName,
          lastName,
          email,
          address,
          zipCode,
          city,
          regionOrState,
          country,
        }));
        setIsLoading(false);
      } catch (err) {
        setUserErr(true);
        setMessage(err[0]);
        setIsLoading(false);
      }
    };
    if (user && user.username === username) {
      getUser();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

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
    setEditLoading(true);
    let position = await getLocation();
    const { latitude, longitude } = position.coords;
    const {
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
      const updatedUser = await marketAPI.updateUser(user.username, {
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
      updateUser({ ...user, ...updatedUser });
      setEditLoading(false);
      navigate(`/users/${user.username}`);
    } catch (err) {
      setSubErr(true);
      setMessage(err);
      setEditLoading(false);
    }
  };

  if (isLoading) {
    return <p className="loading-message">Loading...</p>;
  }

  if (!user) {
    return <h1>Please Log In First!</h1>;
  }

  if (userErr) {
    return <h1>{message}</h1>;
  }

  if (user.username !== username) {
    return <h1>Incorrect User!</h1>;
  }

  return (
    <div className="edit-form-div">
      <h1>Edit {username}'s profile</h1>
      <form onSubmit={handleSubmit}>
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
          <label htmlFor="email">Region Or State: </label>
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

        {!editLoading && (
          <div className="button-div">
            <button>Edit!</button>
          </div>
        )}
      </form>
      {editLoading && <p>Editing...</p>}

      {subErr && <p>{message}</p>}
    </div>
  );
};

export default UserEdit;
