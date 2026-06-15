"use client";

import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

const STATS = [
  { value: "1,240", label: "Items", arabic: "قطعة" },
  { value: "380", label: "Sellers", arabic: "بائع" },
  { value: "52", label: "Countries", arabic: "دولة" },
];

const CATEGORIES = [
  { label: "All", icon: null },
  {
    label: "Antique Weapons",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L8 8L2 12L8 16L12 22L16 16L22 12L16 8L12 2Z" />
        <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.5" />
        <line x1="12" y1="2" x2="12" y2="22" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    label: "Ancient Coins",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1" fill="none" />
        <text x="12" y="15" textAnchor="middle" fontSize="8" fill="currentColor" fontWeight="bold">
          π
        </text>
      </svg>
    ),
  },
  {
    label: "Manuscripts",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 2C5.5 2 5 2.5 5 3V21C5 21.5 5.5 22 6 22H18C18.5 22 19 21.5 19 21V3C19 2.5 18.5 2 18 2H6Z" />
        <line x1="7" y1="5" x2="17" y2="5" stroke="currentColor" strokeWidth="1" />
        <line x1="7" y1="9" x2="17" y2="9" stroke="currentColor" strokeWidth="1" />
        <line x1="7" y1="13" x2="17" y2="13" stroke="currentColor" strokeWidth="1" />
        <line x1="7" y1="17" x2="17" y2="17" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
  },
  { label: "Pottery", icon: "🏺" },
  { label: "Jewelry", icon: "💍" },
  { label: "Statues", icon: "🗿" },
  { label: "Clocks", icon: "⏰" },
  { label: "Carpets", icon: "🪆" },
  { label: "Paintings", icon: "🖼️" },
  { label: "Furniture", icon: "🪑" },
];

export function CaveHero() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <section
      className="relative px-4 pt-8 pb-6"
      style={{
        background: "linear-gradient(180deg, #120F08 0%, #0A0804 100%)",
      }}
    >
      {/* Decorative gold divider line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }}
      />

      {/* Tag line */}
      <p
        className="font-sans text-center text-xs tracking-widest uppercase mb-4"
        style={{ color: "#C9A84C", letterSpacing: "0.2em" }}
      >
        Pi Network Marketplace
      </p>

      {/* Main title */}
      <h1
        className="font-serif italic font-bold text-center text-balance leading-tight mb-2"
        style={{ color: "#F0E8D6", fontSize: "clamp(28px, 8vw, 40px)" }}
      >
        Discover Rare Treasures
      </h1>

      {/* Arabic subtitle */}
      <p
        className="font-sans text-center mb-4"
        dir="rtl"
        style={{ color: "#C9A84C", fontSize: "18px", fontWeight: 600 }}
      >
        اكتشف التحف النادرة
      </p>

      {/* Description */}
      <p
        className="font-sans text-center leading-relaxed mb-6 max-w-xs mx-auto"
        style={{ color: "#8A7A60", fontSize: "13px" }}
      >
        Buy, sell and auction authentic antiques & collectibles from across the world — powered by Pi.
      </p>

      {/* Search bar */}
      <div className="relative mb-4 max-w-sm mx-auto">
        <div
          className="flex items-center rounded-xl overflow-hidden"
          style={{ border: "1.5px solid #C9A84C", backgroundColor: "#120F08" }}
        >
          <div className="pl-3 pr-2 flex items-center" style={{ color: "#C9A84C" }}>
            <Search size={16} />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search antiques, coins, swords..."
            className="flex-1 bg-transparent py-3 pr-2 text-sm outline-none font-sans"
            style={{ color: "#F0E8D6" }}
            aria-label="Search items"
          />
          <button
            className="flex items-center justify-center w-10 h-10 border-l"
            style={{ borderColor: "#2A2015", color: "#C9A84C" }}
            aria-label="Filter"
          >
            <SlidersHorizontal size={15} />
          </button>
        </div>
      </div>

      {/* Category chips — horizontal scroll */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 -mx-4 px-4 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.label;
          return (
            <button
              key={cat.label}
              onClick={() => setActiveCategory(cat.label)}
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full font-sans text-xs font-medium transition-all"
              style={
                isActive
                  ? {
                      backgroundColor: "#C9A84C",
                      color: "#0A0804",
                      fontWeight: 700,
                      border: "1px solid #C9A84C",
                    }
                  : {
                      backgroundColor: "transparent",
                      color: "#8A7A60",
                      border: "1px solid #2A2015",
                    }
              }
            >
              {cat.icon && typeof cat.icon === "object" ? (
                <span style={{ display: "flex", alignItems: "center", color: isActive ? "#0A0804" : "#C9A84C" }}>
                  {cat.icon}
                </span>
              ) : cat.icon ? (
                <span style={{ fontSize: "12px" }}>{cat.icon}</span>
              ) : null}
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Stats row */}
      <div
        className="grid grid-cols-3 gap-px max-w-sm mx-auto rounded-xl overflow-hidden"
        style={{ border: "1px solid #2A2015" }}
      >
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className="flex flex-col items-center py-4 px-2"
            style={{ backgroundColor: "#120F08" }}
          >
            <span
              className="font-serif font-bold"
              style={{ color: "#C9A84C", fontSize: "20px", lineHeight: 1.1 }}
            >
              {stat.value}
            </span>
            <span className="font-sans text-xs mt-1" style={{ color: "#F0E8D6" }}>
              {stat.label}
            </span>
            <span
              className="font-sans text-xs"
              dir="rtl"
              style={{ color: "#8A7A60", fontSize: "10px" }}
            >
              {stat.arabic}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
