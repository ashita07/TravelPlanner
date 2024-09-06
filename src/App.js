import { useState } from "react";
import Logo from "./Logo";
import PackingList from "./PackingList";
import Form from "./Form";
import Stats from "./Stats";

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
        setItems={setItems}
      />
      <Stats length={numItems} lengthPacked={numPacked} />
    </div>
  );
}
