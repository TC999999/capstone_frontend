import { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import ItemList from "./Items.jsx";
import marketAPI from "../../api.js";
import UserContext from "../UserContext.js";
import "../styles/ItemSearch.css";

const ItemSearch = () => {
  const initialState = {
    name: "",
    maxPrice: "",
    condition: "",
  };

  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState(initialState);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentSearch, setCurrentSearch] = useState(searchParams);
  const { user } = useContext(UserContext);

  useEffect(() => {
    function getCompanies() {
      try {
        setIsLoading(true);
        checkParams();
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    }

    if (user) {
      getCompanies();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearch((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      let params = {};
      for (let i in search) {
        if (search[i]) {
          params[i] = search[i];
        }
      }
      let filteredItems = await marketAPI.searchForItems(params);
      setSearchParams(params);

      setItems(filteredItems);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setSearch({ ...initialState, name: search.name });
    }
  };

  const checkParams = async () => {
    let params = {};
    setSearch(initialState);
    if (searchParams.size) {
      for (let i of searchParams) {
        params[i[0]] = i[1];
        setSearch((search) => ({ ...search, [i[0]]: i[1] }));
      }
    }
    let res = await marketAPI.searchForItems(params);
    setItems(res);
    setIsLoading(false);
  };

  if (currentSearch !== searchParams) {
    setIsLoading(true);
    checkParams();
    setCurrentSearch(searchParams);
    setIsLoading(false);
  }

  if (isLoading) {
    return <p className="loading-message">Loading...</p>;
  }

  if (!user) {
    return <h1>Please Log In First!</h1>;
  }

  return (
    <div className="search-items-list-div">
      <div className="item-search-div">
        <form onSubmit={handleSubmit}>
          <input
            id="name"
            type="search"
            name="name"
            placeholder="Search for items by name"
            value={search.name}
            onChange={handleChange}
          />
          <input
            id="maxPrice"
            type="number"
            name="maxPrice"
            placeholder="Maximum Price"
            value={search.maxPrice}
            onChange={handleChange}
          />
          <select
            id="condition"
            name="condition"
            value={search.condition}
            onChange={handleChange}
          >
            <option key="default" value="">
              Item Condition
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
          <button className="search-items-button">Search</button>
        </form>
      </div>

      <div className="filtered-items-list">
        {!items.length && !isLoading ? (
          <p>
            <i>No items match your search</i>
          </p>
        ) : (
          <ItemList items={items} />
        )}
      </div>
    </div>
  );
};

export default ItemSearch;
