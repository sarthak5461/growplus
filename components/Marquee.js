export default function Marquee({ items }) {
  const row = items.map((item) => (
    <div className="marquee-item" key={item}>
      <span>{item}</span>
      <span className="dot" />
    </div>
  ));
  return (
    <div className="marquee-track">
      <div className="marquee-inner">
        {row}
        {row}
      </div>
    </div>
  );
}
