import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import UserContext from "./UserContext";
import ItemCard from "./ItemCard.jsx";
import marketAPI from "../api";
import { getDistance } from "geolib";

const ItemPage = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [item, setItem] = useState([]);
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState("");
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    async function getItem() {
      try {
        setIsLoading(true);
        let itemRes = await marketAPI.getItemById(id);
        setItem(itemRes);
        const itemLat = itemRes.location.latitude;
        const itemLon = itemRes.location.longitude;
        const itemToUser = getDistance(
          { latitude: user.latitude, longitude: user.longitude },
          { latitude: itemLat, longitude: itemLon }
        );
        setDistance(itemToUser);
        setIsLoading(false);
      } catch (err) {
        setErr(true);
        setMessage(err[0]);
        setIsLoading(false);
      }
    }
    if (user) {
      getItem();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return <p className="loading-message">Loading...</p>;
  }

  if (err) {
    return <h1>{message}</h1>;
  }

  if (!user) {
    return <h1>Please Log In First!</h1>;
  }

  return (
    <div className="item">
      <ItemCard item={item} />
      {item.sellerUser === user.username && !item.isSold && (
        <div className="for-sellers-eyes-only">
          <Link to={`/items/${item.id}/edit`}>Edit Item</Link>
        </div>
      )}
      {item.sellerUser !== user.username && (
        <div className="for-different-users-eyes-only">
          <p>
            <b>Distance from your current place of residency: </b>
            {Math.round(distance * 0.000621 * 100) / 100} miles
          </p>
          <p>
            <b>Estimated Driving Time: </b>{" "}
            {Math.round(100 * (distance / 80467.2)) / 100} hrs
          </p>
          {item.isSold ? (
            <div>
              <p>
                <i>This item has been sold</i>
              </p>
            </div>
          ) : (
            <div className="message-seller-link">
              <Link to={`/messages/${item.sellerUser}/item/${item.id}`}>
                Message
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ItemPage;
