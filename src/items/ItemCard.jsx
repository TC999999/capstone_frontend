import { Link } from "react-router-dom";
import "../styles/ItemCard.css";

const ItemCard = ({ item }) => {
  return (
    <div className="item-card">
      <div className="item-image-name item-info">
        {item.id ? (
          <h3>
            <Link to={`/items/${item.id || item.itemID}`}>{item.name}</Link>
          </h3>
        ) : (
          <h3>
            <Link to={`/items/${item.itemID}`}>{item.name}</Link>
          </h3>
        )}

        {item.imageURL && (
          <img width="200" height="200" src={`${item.imageURL}`}></img>
        )}
      </div>
      <div className="additional-item-info item-info">
        <p>
          <b>Price:</b> ${item.initialPrice}
        </p>
        {item.sellerUser && (
          <p>
            <b>Seller:</b>{" "}
            <Link to={`/users/${item.sellerUser}`}>{item.sellerUser}</Link>
          </p>
        )}
        <p>
          <b>Condition:</b> {item.condition}
        </p>
        <p>
          <b>Description:</b> {item.description}
        </p>
        {item.location && (
          <p>
            <b>Location:</b> {item.location.city}, {item.location.regionOrState}
            , {item.location.country}
          </p>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
