import { Link } from "react-router-dom";

const PurchaseCard = ({ item }) => {
  return (
    <div className="purchase-card">
      <h3>{item.itemName}</h3>
      {item.imageURL && (
        <img width="200" height="200" src={`${item.imageURL}`}></img>
      )}
      {item.sellerUser && (
        <p>
          <b>Seller:</b>{" "}
          <Link to={`/users/${item.sellerUser}`}>{item.sellerUser}</Link>
        </p>
      )}
      <p>
        <b>From a Flagged User:</b> {item.fromFlaggedUser ? "Yes" : "No"}
      </p>
    </div>
  );
};

export default PurchaseCard;
