export default function Stats({ length, lengthPacked }) {
  if (!length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list</em>
      </p>
    );

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
