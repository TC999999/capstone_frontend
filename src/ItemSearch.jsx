import { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import ItemList from "./Items";
import marketAPI from "../api";
import UserContext from "./UserContext.js";

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
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    function getCompanies() {
      try {
        setIsLoading(true);
        checkParams();
      } catch (err) {
        setErr(true);
        setMessage(err[0]);
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
      setErr(false);
      setMessage("");
      setItems(filteredItems);
      setIsLoading(false);
    } catch (err) {
      setErr(true);
      setMessage(err[0]);
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
          <select id="condition" name="condition" onChange={handleChange}>
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
          <button>Search</button>
        </form>
      </div>

      <h1>Items</h1>
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
