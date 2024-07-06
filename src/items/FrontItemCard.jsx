import { Link } from "react-router-dom";
import "../styles/FrontItemCard.css";

const FrontItemCard = ({ item }) => {
  return (
    <div id={`item-${item.id || item.itemID}`} className="front-item-card">
      <h3>
        <Link to={`/items/${item.id || item.itemID}`}>{item.name}</Link>
      </h3>
      <p>
        <b>Price: </b> ${item.initialPrice}
      </p>
      {item.imageURL && (
        <img width="200" height="200" src={`${item.imageURL}`}></img>
      )}
      <div className="item-location-div">
        {item.location ? (
          <p>
            <b>Location:</b> {item.location.city}, {item.location.regionOrState}
            , {item.location.country}
          </p>
        ) : (
          <p>
            <b>Location:</b> {item.city}, {item.regionOrState}, {item.country}
          </p>
        )}
      </div>
    </div>
  );
};

export default FrontItemCard;
