import { useState } from "react";
import Item from "./Item";
export default function PackingList({
  itemsArray,
  onDelete,
  toHandleToggle,
  setItems,
}) {
  const [sortBy, setSortBy] = useState("input");

  function handleDelete() {
    let a = window.confirm("are you sure you wannna clear all items?");
    if (a) setItems([]);
  }

  let sortedItems;
  if (sortBy === "input") sortedItems = itemsArray;

  if (sortBy === "description")
    sortedItems = itemsArray
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = itemsArray
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDelete={onDelete}
            toHandleToggle={toHandleToggle}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by Input</option>
          <option value="description">Sort by Description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={handleDelete}>Clear</button>
      </div>
    </div>
  );
}
