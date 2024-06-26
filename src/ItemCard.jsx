import { Link } from "react-router-dom";
// import { useState, useEffect, useContext } from "react";
// import UserContext from "./UserContext";

const ItemCard = ({ item }) => {
  //   const { user } = useContext(UserContext);
  return (
    <div className="item-card">
      {item.id ? (
        <h3>
          <Link to={`/items/${item.id || item.itemID}`}>{item.name}</Link>
        </h3>
      ) : (
        <h3>
          <Link to={`/items/${item.itemID}`}>{item.name}</Link>
        </h3>
      )}

      <p>
        <b>Price:</b> {item.initialPrice}
      </p>
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
        <b>Condition:</b> {item.condition}
      </p>
      <p>
        <b>Description:</b> {item.description}
      </p>
      {item.location && (
        <p>
          <b>Location:</b> {item.location.city}, {item.location.regionOrState}
        </p>
      )}
    </div>
  );
};

export default ItemCard;
