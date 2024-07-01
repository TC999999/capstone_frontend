import { useState, useEffect, useContext } from "react";
import UserContext from "./UserContext";
import marketAPI from "../api";
import FrontItemList from "./FrontItems.jsx";

const Home = () => {
  const { user } = useContext(UserContext);
  const [reccomendedItems, setReccomendedItems] = useState([]);
  const [itemsInLocation, setItemsInLocation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //   const [err, setErr] = useState(false);

  const getFrontPageItems = async () => {
    try {
      setIsLoading(true);
      let reccomendedItems = await marketAPI.getReccomendedItems(user.username);
      let itemsInLocation = await marketAPI.getItemsInLocation(user.username);
      setReccomendedItems(reccomendedItems);
      setItemsInLocation(itemsInLocation);
      setIsLoading(false);
    } catch (err) {
      //   setErr(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (user) {
      getFrontPageItems();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return <p className="loading-message">Loading...</p>;
  }

  return (
    <div className="home-div">
      <h1>Welcome to The Market!</h1>
      {!user && <h2>Please log in for full experience!</h2>}
      {user && (
        <div className="front-page-items">
          <h2>Welcome {user.username}</h2>
          <div className="reccomended-items-list-div">
            <h3>Items For You!</h3>
            <FrontItemList items={reccomendedItems} />
          </div>
          <div className="items-near-location-list-div">
            <h3>Items Near You!</h3>
            <FrontItemList items={itemsInLocation} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
