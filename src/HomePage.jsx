import { useState, useEffect, useContext } from "react";
import UserContext from "./UserContext";
import marketAPI from "../api";
import FrontItemList from "./items/FrontItems.jsx";
import "./styles/HomePage.css";

const Home = () => {
  const { user } = useContext(UserContext);
  const [reccomendedItems, setReccomendedItems] = useState([]);
  const [itemsInLocation, setItemsInLocation] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //gets both reccomended items based on type and location
  const getFrontPageItems = async () => {
    try {
      setIsLoading(true);
      let reccomendedItems = await marketAPI.getReccomendedItems(user.username);
      let itemsInLocation = await marketAPI.getItemsInLocation(user.username);
      setReccomendedItems(reccomendedItems);
      setItemsInLocation(itemsInLocation);
      setIsLoading(false);
    } catch (err) {
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
      <h1>Welcome to The Worldwide Garage Sale!</h1>
      {!user && <h2>Please log in for full experience!</h2>}
      {user && (
        <div className="front-page-user">
          <h2>Reccomended Items for {user.username}</h2>
          <div className="front-page-items">
            <div className="reccomended-items-list-div">
              <h2>Items For You!</h2>
              <FrontItemList items={reccomendedItems} />
            </div>
            <div className="items-near-location-list-div">
              <h2>Items Near You!</h2>
              <FrontItemList items={itemsInLocation} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
