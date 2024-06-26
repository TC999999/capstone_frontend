import FrontItemCard from "./FrontItemCard.jsx";

const FrontItemList = ({ items }) => {
  return (
    <div className="item-list">
      {!items.length ? (
        <p>
          <i>No items yet</i>
        </p>
      ) : (
        <ul>
          {items.map((item) => {
            return (
              <li key={`item-${item.id || item.itemID}`}>
                <FrontItemCard item={item} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default FrontItemList;
