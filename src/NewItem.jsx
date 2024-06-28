import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import marketApi from "../api";
import UserContext from "./UserContext";
import { v4 as uuidv4 } from "uuid";

const NewItem = () => {
  const initialState = {
    name: "",
    initialPrice: "0",
    imageName: "",
    imageFile: null,
    condition: "",
    description: "",
    typeIDArr: [],
  };
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const getTypes = async () => {
      const types = await marketApi.getAllTypes();
      setTypes(types);
    };
    setIsLoading(true);
    if (user) {
      getTypes();
    }
    setIsLoading(false);
  }, [user]);

  if (isLoading) {
    return <p className="loading-message">Loading...</p>;
  }

  if (!user) {
    return <h1>Please Log In First!</h1>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleFileChange = (e) => {
    let file = e.target.files[0];
    if (file) {
      setFormData((data) => ({
        ...data,
        imageFile: file,
        imageName: `${uuidv4()}-${file.name}`,
      }));
    } else {
      setFormData((data) => ({
        ...data,
        imageFile: null,
        imageName: "",
      }));
    }
  };

  const handleCheckChange = (e) => {
    const { value, checked } = e.target;
    let newIDArr = formData.typeIDArr;
    if (checked) {
      newIDArr.push(value);
    } else {
      newIDArr = newIDArr.filter((tId) => {
        return tId !== value;
      });
    }
    setFormData((data) => ({ ...data, typeIDArr: newIDArr }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const {
        name,
        initialPrice,
        imageName,
        imageFile,
        condition,
        description,
        typeIDArr,
      } = formData;

      let parsedPrice = parseInt(initialPrice);

      await marketApi.addItem({
        name,
        initialPrice: parsedPrice,
        imageName,
        imageFile,
        condition,
        description,
        typeIDArr,
      });
      setFormData(initialState);
      setIsLoading(false);
      navigate(`/users/${user.username}`);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <div className="new-item-form-div">
      <h1>Add an item for {user.username}</h1>
      <div className="new-item-form">
        <form onSubmit={handleSubmit}>
          <div className="name-div">
            <label htmlFor="name">Name: </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="name of item"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="image-file-div">
            <label htmlFor="imageFile">Image File: </label>
            <input
              id="imageFile"
              type="file"
              name="imageFile"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleFileChange}
              required
            />
          </div>

          <div className="price-div">
            <label htmlFor="initialPrice">Price (in $): </label>
            <input
              id="initialPrice"
              type="number"
              name="initialPrice"
              min="0"
              placeholder="price of item"
              value={formData.initialPrice}
              onChange={handleChange}
              required
            />
          </div>

          <select
            id="condition"
            name="condition"
            onChange={handleChange}
            required
          >
            <option key="default" value="">
              -----Select Options Below-----
            </option>
            <option key="great" value="Great">
              Great
            </option>
            <option key="good" value="good">
              good
            </option>
            <option key="ok" value="ok">
              ok
            </option>
            <option key="poor" value="poor">
              poor
            </option>
          </select>

          <div className="description-div">
            <label htmlFor="description">Description: </label>
            <textarea
              rows="5"
              cols="33"
              name="description"
              id="description"
              placeholder="type item description here"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="types-div">
            <h3>Select all types that apply to your item</h3>
            <ul>
              {types.map((type, index) => {
                return (
                  <li key={`type-${index}`}>
                    <label htmlFor={`${type.name}`}>{type.name}: </label>
                    <input
                      type="checkbox"
                      name={`${type.name}`}
                      id={`${type.id}`}
                      value={`${type.id}`}
                      onChange={handleCheckChange}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default NewItem;
