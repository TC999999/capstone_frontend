import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import marketAPI from "../../api";
import UserContext from "../UserContext";

const ItemEdit = () => {
  const initialState = {
    name: "",
    initialPrice: "",
    condition: "",
    description: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const { user, updateUser } = useContext(UserContext);
  const [sellerUser, setSellerUser] = useState("");
  const [itemName, setItemName] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const [userErr, setUserErr] = useState(false);
  const [subErr, setSubErr] = useState(false);
  const [message, setMessage] = useState("");
  const [isSold, setIsSold] = useState(false);

  useEffect(() => {
    const getItem = async () => {
      try {
        setIsLoading(true);
        let itemRes = await marketAPI.getItemById(id);
        if (itemRes.isSold) {
          setIsSold(true);
        } else {
          let { name, initialPrice, condition, description } = itemRes;
          setItemName(name);
          setFormData((d) => ({
            ...d,
            name,
            initialPrice,
            condition,
            description,
          }));
        }

        setIsLoading(false);
      } catch (err) {
        setUserErr(true);
        setMessage(err[0]);
        setIsLoading(false);
      }
    };
    const getSeller = async () => {
      let sellerUsername = await marketAPI.getItemSeller(id);
      if (user && user.username === sellerUsername) {
        setSellerUser(sellerUsername);
        getItem();
      } else {
        setIsLoading(false);
      }
    };
    getSeller();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setEditLoading(true);
      const { name, initialPrice, condition, description } = formData;
      let parsedPrice = parseInt(initialPrice);
      await marketAPI.updateItem(id, user.username, {
        name,
        initialPrice: parsedPrice,
        condition,
        description,
      });
      updateUser(user.username);
      setFormData(initialState);
      setEditLoading(false);
      navigate(`/items/${id}`);
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

  if (isSold) {
    return <h1>This item Has already been sold!</h1>;
  }

  if (userErr) {
    return <h1>{message}</h1>;
  }

  if (user.username !== sellerUser) {
    return <h1>Incorrect User!</h1>;
  }

  return (
    <div className="edit-item-form-div">
      <h1>Edit item {itemName}</h1>
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
            value={formData.condition}
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

          {!editLoading && (
            <div className="button-div">
              <button>Edit!</button>
            </div>
          )}
        </form>
        {editLoading && <p>Editing...</p>}

        {subErr && <p>{message}</p>}
      </div>
    </div>
  );
};

export default ItemEdit;