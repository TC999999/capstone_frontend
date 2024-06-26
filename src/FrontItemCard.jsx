import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const FrontItemCard = ({ item }) => {
  return (
    <div className="item-card">
      <h3>
        <Link to={`/items/${item.id || item.itemID}`}>{item.name}</Link>
      </h3>
      <p>
        <b>Price:</b> {item.initialPrice}
      </p>
      {item.imageURL && <img src={`${item.imageURL}`}></img>}
      {item.location ? (
        <p>
          <b>Location:</b> {item.location.city}, {item.location.regionOrState}
        </p>
      ) : (
        <p>
          <b>Location:</b> {item.city}, {item.regionOrState}
        </p>
      )}
    </div>
  );
};

export default FrontItemCard;
