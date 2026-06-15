"use client";

import { useState } from "react";
import { Gavel } from "lucide-react";
import { CaveAuctionCard } from "./cave-auction-card";

const AUCTION_ITEMS = [
  {
    id: 1,
    name: "Etruscan Bronze Vessel",
    arabic: "إناء برونزي إتروسكي",
    flag: "🇮🇹",
    country: "Italy",
    condition: "Excellent",
    rating: 4.9,
    reviews: 14,
    currentBid: 180,
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=500&h=500&fit=crop",
    endTime: new Date(Date.now() + 3 * 60 * 60 * 1000 + 25 * 60 * 1000),
    isLive: true,
  },
  {
    id: 2,
    name: "Byzantine Necklace",
    arabic: "عقد بيزنطي",
    flag: "🇬🇷",
    country: "Greece",
    condition: "Rare",
    rating: 4.8,
    reviews: 9,
    currentBid: 310,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop",
    endTime: new Date(Date.now() + 1 * 60 * 60 * 1000 + 10 * 60 * 1000),
    isLive: true,
  },
  {
    id: 3,
    name: "Mayan Stone Idol",
    arabic: "صنم حجري مايا",
    flag: "🇲🇽",
    country: "Mexico",
    condition: "Rare",
    rating: 5.0,
    reviews: 22,
    currentBid: 520,
    image: "https://images.unsplash.com/photo-1596399900682-ded3e08b8d88?w=500&h=500&fit=crop",
    endTime: new Date(Date.now() + 45 * 60 * 1000),
    isLive: true,
  },
  {
    id: 4,
    name: "Persian Turquoise Bowl",
    arabic: "وعاء الفيروز الفارسي",
    flag: "🇮🇷",
    country: "Iran",
    condition: "Good",
    rating: 4.7,
    reviews: 11,
    currentBid: 250,
    image: "https://images.unsplash.com/photo-1608126911621-5e43f5e86513?w=500&h=500&fit=crop",
    endTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
    isLive: true,
  },
  {
    id: 5,
    name: "Roman Terracotta Lamp",
    arabic: "مصباح فخار روماني",
    flag: "🇮🇹",
    country: "Italy",
    condition: "Excellent",
    rating: 4.9,
    reviews: 18,
    currentBid: 95,
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=500&h=500&fit=crop",
    endTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
    isLive: true,
  },
  {
    id: 6,
    name: "Chinese Ming Vase",
    arabic: "مزهرية مينج الصينية",
    flag: "🇨🇳",
    country: "China",
    condition: "Rare",
    rating: 5.0,
    reviews: 27,
    currentBid: 680,
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=500&h=500&fit=crop",
    endTime: new Date(Date.now() + 30 * 60 * 1000),
    isLive: true,
  },
];

interface CaveAuctionsProps {
  isFullPage?: boolean;
}

export function CaveAuctions({ isFullPage = false }: CaveAuctionsProps) {
  return (
    <section className="px-4 py-6" style={{ backgroundColor: "#0A0804" }}>
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Gavel size={16} style={{ color: "#C9A84C" }} />
          <div>
            <h2 className="font-serif font-bold" style={{ color: "#F0E8D6", fontSize: "18px" }}>
              {isFullPage ? "Live Auctions" : "Live Auctions"}
            </h2>
            <p className="font-sans text-xs" style={{ color: "#8A7A60" }}>
              {isFullPage ? "All active auctions" : "المزادات الحية"}
            </p>
          </div>
        </div>
        {!isFullPage && (
          <button
            className="font-sans text-xs font-medium px-3 py-1.5 rounded-lg"
            style={{ color: "#C9A84C", border: "1px solid #C9A84C44" }}
          >
            View All
          </button>
        )}
      </div>

      {/* Grid of auction cards */}
      <div className={isFullPage ? "grid grid-cols-2 gap-3" : "space-y-3"}>
        {(isFullPage ? AUCTION_ITEMS : AUCTION_ITEMS.slice(0, 3)).map((item) => (
          <CaveAuctionCard
            key={item.id}
            {...item}
          />
        ))}
      </div>
    </section>
  );
}
