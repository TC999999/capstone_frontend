import ItemCard from "./ItemCard.jsx";

const ItemList = ({ items }) => {
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
              <li key={`item-${item.itemID || item.id}`}>
                <ItemCard item={item} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ItemList;
