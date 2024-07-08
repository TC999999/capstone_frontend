import { useState, useEffect, useContext } from "react";
import UserContext from "../UserContext.js";
import { useNavigate } from "react-router-dom";
import marketAPI from "../../api.js";
import "../styles/NewType.css";

const NewType = () => {
  const initialState = {
    typeName: "",
  };
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [types, setTypes] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getTypes = async () => {
      const typeRes = await marketAPI.getAllTypes();
      setTypes(typeRes);
    };

    setIsLoading(true);
    if (user && user.isAdmin) {
      getTypes();
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let { typeName } = formData;

      await marketAPI.addNewItemType({ typeName });

      setFormData(initialState);
      navigate(`/users/${user.username}`);
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

  if (!user.isAdmin) {
    return <h1>Only admins can see this page!</h1>;
  }

  return (
    <div className="new-type-page-div">
      <div className="new-type-info-div">
        <div className="current-types-div">
          <h3>Current Types</h3>
          <ul>
            {types.map((type) => {
              return <li key={`type-${type.id}`}>{type.name}</li>;
            })}
          </ul>
        </div>
        <div className="add-new-type-form">
          <h3>Add New Type Here</h3>
          <form onSubmit={handleSubmit}>
            <div className="new-type-form-div new-type-name-div">
              <label htmlFor="typeName"></label>

              <input
                type="text"
                id="typeName"
                name="typeName"
                placeholder="type name of new type here"
                value={formData.typeName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="new-type-form-div">
              <button
                className="add-item-type-form-button"
                onSubmit={handleSubmit}
              >
                Add Type
              </button>
            </div>
          </form>
          {err && <p className="err-msg">{message}</p>}
        </div>
      </div>
      <button className="back-button" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>
    </div>
  );
};

export default NewType;
