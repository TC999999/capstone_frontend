import ItemCard from "./ItemCard.jsx";
// import "./Items.css"

const ItemList = ({ items }) => {
  return (
    <div className="item-list">
      {!items.length ? (
        <p>
          <i>No items yet</i>
        </p>
      ) : (
        <div className="filtered-item-list">
          {items.map((item) => {
            return <ItemCard key={item.id || item.itemID} item={item} />;
          })}
        </div>
      )}
    </div>
  );
};

export default ItemList;
