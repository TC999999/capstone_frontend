import { Link } from "react-router-dom";
import "../styles/UserPurchasesCard.css";

const PurchaseCard = ({ item }) => {
  return (
    <div className="purchase-card">
      <div className="inner-purchase-card-div purchase-image-and-name">
        <h3>{item.itemName}</h3>
        {item.imageURL && (
          <img width="200" height="200" src={`${item.imageURL}`}></img>
        )}
      </div>
      <div className="inner-purchase-card-div additional-purchase-info">
        {item.sellerUser && (
          <p>
            <b>Seller:</b>{" "}
            <Link to={`/users/${item.sellerUser}`}>{item.sellerUser}</Link>
          </p>
        )}
        <p>
          <b>Price:</b> ${item.price}
        </p>
        <p>
          <b>From a Flagged User:</b> {item.fromFlaggedUser ? "Yes" : "No"}
        </p>
        <small>
          <i>
            <b>Sold At:</b> {item.soldAt}
          </i>
        </small>
      </div>
    </div>
  );
};

export default PurchaseCard;
