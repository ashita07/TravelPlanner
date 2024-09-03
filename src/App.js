import { useState } from "react";
const Array = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];
// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "Bags", quantity: 3, packed: false },
//   { id: 4, description: "charger", quantity: 3, packed: true },
//   { id: 5, description: "sunscreen", quantity: 2, packed: true },
//   { id: 6, description: "Tshirts", quantity: 3, packed: false },
// ];

export default function App() {
  const [items, setItems] = useState([]);

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;

  function handleItems(newItem) {
    setItems((i) => [...i, newItem]);
  }

  function deleteItems(id) {
    setItems((item) => item.filter((item) => item.id !== id));
  }

  function handleToggle(id) {
    setItems((item) =>
      item.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form handlenewfunc={handleItems} />
      <PackingList
        itemsArray={items}
        onDelete={deleteItems}
        toHandleToggle={handleToggle}
      />
      <Stats length={numItems} lengthPacked={numPacked} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 🛒</h1>;
}

function Form({ handlenewfunc }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    const newItem = { description, quantity, packed: false, id: Date.now() };

    if (!description) return;
    handlenewfunc(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item.."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
function PackingList({ itemsArray, onDelete, toHandleToggle }) {
  return (
    <div className="list">
      <ul>
        {itemsArray.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDelete={onDelete}
            toHandleToggle={toHandleToggle}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDelete, toHandleToggle }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => toHandleToggle(item.id)}
      />
      <span
        key={item.id}
        style={item.packed ? { textDecoration: "line-through" } : {}}
      >
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDelete(item.id)}>❌</button>
    </li>
  );
}
function Stats({ length, lengthPacked }) {
  const percent = Math.round((lengthPacked / length) * 100);
  return (
    <footer className="stats">
      <em>
        {" "}
        {percent === 100
          ? "you are done packing!! Ready to go✈️"
          : ` 👜You have ${length} items in your list , and you already packed
        ${lengthPacked} (${percent}%)`}
      </em>
    </footer>
  );
}
