"use client";

const TICKER_ITEMS = [
  { icon: "🏺", name: "Roman Oil Lamp", price: "45 Pi" },
  { icon: "🗡️", name: "Ottoman Sword", price: "120 Pi" },
  { icon: "📜", name: "Ancient Manuscript", price: "200 Pi" },
  { icon: "🪙", name: "Gold Coin 1800s", price: "80 Pi" },
  { icon: "🏛️", name: "Bronze Statue", price: "350 Pi" },
  { icon: "💎", name: "Persian Gem Ring", price: "95 Pi" },
  { icon: "🖼️", name: "Victorian Portrait", price: "175 Pi" },
  { icon: "⚗️", name: "Alchemist Flask", price: "60 Pi" },
];

export function CaveTicker() {
  // Duplicate for seamless loop
  const allItems = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div
      className="overflow-hidden"
      style={{ backgroundColor: "#0F0B06", borderBottom: "1px solid #2A2015" }}
      aria-label="Live listings ticker"
    >
      <div className="ticker-track py-2">
        {allItems.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-1 px-4 whitespace-nowrap"
          >
            <span className="text-sm">{item.icon}</span>
            <span
              className="font-sans text-xs font-medium"
              style={{ color: "#C9A84C" }}
            >
              {item.name}
            </span>
            <span className="font-sans text-xs" style={{ color: "#8A6F2E" }}>
              —
            </span>
            <span
              className="font-serif text-xs font-semibold"
              style={{ color: "#E2C07A" }}
            >
              {item.price}
            </span>
            <span
              className="ml-4 font-sans text-xs"
              style={{ color: "#2A2015" }}
            >
              |
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
