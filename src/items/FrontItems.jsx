import FrontItemCard from "./FrontItemCard.jsx";
import "../styles/FrontItems.css";

const FrontItemList = ({ items }) => {
  return (
    <div className="item-list-div">
      {!items.length ? (
        <p>
          <i>No items yet</i>
        </p>
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
