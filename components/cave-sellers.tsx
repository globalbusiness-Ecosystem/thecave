"use client";

import { Star, Shield, MapPin } from "lucide-react";

const TOP_SELLERS = [
  {
    id: 1,
    initials: "AH",
    name: "Ali Hassan",
    location: "Cairo, Egypt",
    items: 48,
    rating: 5.0,
    verified: true,
  },
  {
    id: 2,
    initials: "SK",
    name: "Selin Kaya",
    location: "Istanbul, Turkey",
    items: 31,
    rating: 4.9,
    verified: true,
  },
  {
    id: 3,
    initials: "MR",
    name: "Marco Romano",
    location: "Rome, Italy",
    items: 22,
    rating: 4.8,
    verified: false,
  },
  {
    id: 4,
    initials: "FN",
    name: "Fatima Nouri",
    location: "Tehran, Iran",
    items: 17,
    rating: 4.9,
    verified: true,
  },
];

const AVATAR_COLORS = ["#8A3A0A", "#0A3A6A", "#1A5A2A", "#5A1A5A"];

export function CaveSellers() {
  return (
    <section
      className="px-4 py-6"
      style={{ backgroundColor: "#0F0B06" }}
    >
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-serif font-bold" style={{ color: "#F0E8D6", fontSize: "18px" }}>
            Top Sellers
          </h2>
          <p className="font-sans text-xs mt-0.5" style={{ color: "#8A7A60" }}>
            أفضل البائعين
          </p>
        </div>
        <button
          className="font-sans text-xs font-medium px-3 py-1.5 rounded-lg"
          style={{ color: "#C9A84C", border: "1px solid #C9A84C44" }}
        >
          See All
        </button>
      </div>

      {/* Seller cards horizontal scroll */}
      <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
        {TOP_SELLERS.map((seller, idx) => (
          <div
            key={seller.id}
            className="flex-shrink-0 w-36 rounded-2xl p-3 text-center"
            style={{ backgroundColor: "#120F08", border: "1px solid #2A2015" }}
          >
            {/* Avatar */}
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center font-serif font-bold mx-auto mb-2 relative"
              style={{
                backgroundColor: AVATAR_COLORS[idx],
                color: "#F0E8D6",
                fontSize: "16px",
                border: "2px solid #2A2015",
              }}
            >
              {seller.initials}
              {seller.verified && (
                <div
                  className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#C9A84C" }}
                >
                  <Shield size={10} fill="#0A0804" stroke="none" />
                </div>
              )}
            </div>

            <p
              className="font-sans font-semibold leading-tight text-xs mb-0.5"
              style={{ color: "#F0E8D6" }}
            >
              {seller.name}
            </p>

            <div className="flex items-center justify-center gap-1 mb-1">
              <MapPin size={9} style={{ color: "#8A7A60" }} />
              <p className="font-sans text-center" style={{ color: "#8A7A60", fontSize: "9px" }}>
                {seller.location}
              </p>
            </div>

            <div className="flex items-center justify-center gap-1 mb-2">
              <Star size={9} fill="#C9A84C" stroke="none" />
              <span className="font-sans" style={{ color: "#C9A84C", fontSize: "10px" }}>
                {seller.rating}
              </span>
            </div>

            <div
              className="rounded-lg py-1"
              style={{ backgroundColor: "#1A1510" }}
            >
              <p className="font-sans" style={{ color: "#C9A84C", fontSize: "10px" }}>
                {seller.items} items
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
