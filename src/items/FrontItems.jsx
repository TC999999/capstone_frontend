import FrontItemCard from "./FrontItemCard.jsx";
import "../styles/FrontItems.css";
import { Link } from "react-router-dom";

const FrontItemList = ({ items }) => {
  return (
    <div className="item-list-div">
      {!items.length ? (
        <div className="empty-frontpage-list-div">
          <p>
            <i>No items yet</i>
          </p>
          <p>
            {" "}
            <Link to={`items/search/all`}>Start Your Search Here</Link>
          </p>
        </div>
      ) : (
        <div className="front-item-list">
          {items.map((item) => {
            return <FrontItemCard key={item.id || item.itemID} item={item} />;
          })}
        </div>
      )}
    </div>
  );
};

export default FrontItemList;
