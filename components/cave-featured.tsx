"use client";

import { useState, useEffect } from "react";
import { Heart, Star } from "lucide-react";
import { AuctionBidModal } from "./auction-bid-modal";

const ITEMS = [
  {
    id: 1,
    name: "Ottoman Dagger 1750",
    arabic: "خنجر عثماني ١٧٥٠",
    flag: "🇹🇷",
    country: "Turkey",
    era: "Ottoman Empire",
    period: "18th Century",
    condition: "Excellent",
    rating: 4.9,
    reviews: 14,
    price: 85,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    endTime: new Date(Date.now() + 3 * 60 * 60 * 1000 + 25 * 60 * 1000),
  },
  {
    id: 2,
    name: "Roman Bronze Coin",
    arabic: "عملة برونزية رومانية",
    flag: "🇮🇹",
    country: "Italy",
    era: "Roman Empire",
    period: "1st Century BC",
    condition: "Rare",
    rating: 4.8,
    reviews: 22,
    price: 45,
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400",
    endTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
  },
  {
    id: 3,
    name: "Persian Carpet 1920",
    arabic: "سجادة فارسية ١٩٢٠",
    flag: "🇮🇷",
    country: "Iran",
    era: "Qajar Dynasty",
    period: "Early 20th Century",
    condition: "Good",
    rating: 4.7,
    reviews: 9,
    price: 320,
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400",
    endTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
  },
  {
    id: 4,
    name: "Egyptian Scarab",
    arabic: "جعران مصري أثري",
    flag: "🇪🇬",
    country: "Egypt",
    era: "New Kingdom",
    period: "1550–1070 BC",
    condition: "Rare",
    rating: 5.0,
    reviews: 6,
    price: 150,
    image: "https://images.unsplash.com/photo-1608178398319-48f814d0750c?w=400",
    endTime: new Date(Date.now() + 1 * 60 * 60 * 1000 + 30 * 60 * 1000),
  },
  {
    id: 5,
    name: "Chinese Vase 1800s",
    arabic: "مزهرية صينية ١٨٠٠",
    flag: "🇨🇳",
    country: "China",
    era: "Qing Dynasty",
    period: "19th Century",
    condition: "Excellent",
    rating: 4.9,
    reviews: 18,
    price: 280,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
    endTime: new Date(Date.now() + 4 * 60 * 60 * 1000),
  },
  {
    id: 6,
    name: "Ottoman Manuscript",
    arabic: "مخطوطة عثمانية نادرة",
    flag: "🇸🇦",
    country: "Arabia",
    era: "Ottoman Caliphate",
    period: "16th Century",
    condition: "Rare",
    rating: 4.8,
    reviews: 4,
    price: 200,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
    endTime: new Date(Date.now() + 45 * 60 * 1000),
  },
  {
    id: 7,
    name: "Silver Compass 1850",
    arabic: "بوصلة فضية ١٨٥٠",
    flag: "🇬🇧",
    country: "England",
    era: "Victorian Era",
    period: "Mid 19th Century",
    condition: "Good",
    rating: 4.6,
    reviews: 11,
    price: 95,
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400",
    endTime: new Date(Date.now() + 6 * 60 * 60 * 1000),
  },
  {
    id: 8,
    name: "French Clock 1900",
    arabic: "ساعة فرنسية ١٩٠٠",
    flag: "🇫🇷",
    country: "France",
    era: "Belle Époque",
    period: "Early 20th Century",
    condition: "Excellent",
    rating: 4.9,
    reviews: 16,
    price: 175,
    image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400",
    endTime: new Date(Date.now() + 2 * 60 * 60 * 1000 + 15 * 60 * 1000),
  },
];

const CONDITION_STYLE: Record<string, { bg: string; color: string; border: string }> = {
  Excellent: { bg: "#0A2010", color: "#4ADE80", border: "#166534" },
  Good:      { bg: "#1A1200", color: "#FACC15", border: "#713F12" },
  Rare:      { bg: "#1A0A1A", color: "#C084FC", border: "#6B21A8" },
};

export function CaveFeatured() {
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const [bidModalOpen, setBidModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<Record<number, string>>({});
  const [currentBids, setCurrentBids] = useState<Record<number, number>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize bids
  useEffect(() => {
    const initialBids: Record<number, number> = {};
    ITEMS.forEach((item) => {
      initialBids[item.id] = item.price;
    });
    setCurrentBids(initialBids);
  }, []);

  const toggleLike = (id: number) =>
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));

  // Show toast notification
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Update countdown timers
  useEffect(() => {
    const updateTimers = () => {
      const times: Record<number, string> = {};
      ITEMS.forEach((item) => {
        const now = new Date();
        const diff = item.endTime.getTime() - now.getTime();

        if (diff <= 0) {
          times[item.id] = "Ended";
        } else {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);

          if (hours > 0) {
            times[item.id] = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
          } else if (minutes > 0) {
            times[item.id] = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:00`;
          } else {
            times[item.id] = `00:00:${String(seconds).padStart(2, "0")}`;
          }
        }
      });
      setTimeRemaining(times);
    };

    updateTimers();
    const interval = setInterval(updateTimers, 1000);
    return () => clearInterval(interval);
  }, []);

  const selectedItem = selectedItemId ? ITEMS.find((i) => i.id === selectedItemId) : null;
  const currentBid = selectedItemId ? (currentBids[selectedItemId] || 0) : 0;
  const minNextBid = currentBid ? Math.ceil(currentBid * 1.05 * 10) / 10 : 0;

  const handleBidSubmit = (bidAmount: number) => {
    if (selectedItemId) {
      setCurrentBids((prev) => ({ ...prev, [selectedItemId]: bidAmount }));
      showToast("Bid Recorded!");
      setBidModalOpen(false);
      console.log(`[v0] Bid submitted for item ${selectedItemId}: π ${bidAmount}`);
    }
  };

  const openBidModal = (itemId: number) => {
    setSelectedItemId(itemId);
    setBidModalOpen(true);
  };

  return (
    <section className="px-4 py-6">
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2
            className="font-serif font-bold"
            style={{ color: "#F0E8D6", fontSize: "18px" }}
          >
            Featured Items
          </h2>
          <p className="font-sans text-xs mt-0.5" style={{ color: "#8A7A60" }}>
            التحف المميزة
          </p>
        </div>
        <button
          className="font-sans text-xs font-medium px-3 py-1.5 rounded-lg"
          style={{ color: "#C9A84C", border: "1px solid #C9A84C44" }}
        >
          View All
        </button>
      </div>

      {/* 2-column grid */}
      <div className="grid grid-cols-2 gap-3">
        {ITEMS.map((item) => {
          const cond = CONDITION_STYLE[item.condition];
          const isLiked = liked[item.id];
          const countdown = timeRemaining[item.id] || "Loading...";
          const isEnded = countdown === "Ended";

          return (
            <article
              key={item.id}
              className="rounded-2xl overflow-hidden flex flex-col"
              style={{
                backgroundColor: "#1A1610",
                border: "1px solid #C9A84C33",
              }}
            >
              {/* Image with overlay gradient */}
              <div
                className="relative flex flex-col items-center justify-center overflow-hidden"
                style={{
                  height: "130px",
                }}
              >
                {/* Background image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Dark overlay gradient (bottom) for text readability */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to bottom, rgba(10, 8, 4, 0) 0%, rgba(10, 8, 4, 0.4) 60%, rgba(10, 8, 4, 0.7) 100%)",
                  }}
                />

                {/* Countdown timer badge - red if urgent */}
                <div
                  className="absolute top-2 left-2 px-2 py-1 rounded-lg font-sans font-bold text-xs"
                  style={{
                    backgroundColor: isEnded ? "#1A1A1A" : "#8B0000",
                    color: isEnded ? "#666" : "#FF4444",
                    border: isEnded ? "1px solid #404040" : "1px solid #FF6B6B",
                  }}
                >
                  {countdown}
                </div>

                {/* Country flag + name */}
                <div
                  className="relative z-10 flex items-center gap-1 px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: "#0A080488" }}
                >
                  <span style={{ fontSize: "11px" }}>{item.flag}</span>
                  <span className="font-sans" style={{ color: "#C9A84C", fontSize: "9px" }}>
                    {item.country}
                  </span>
                </div>

                {/* Like button */}
                <button
                  onClick={() => toggleLike(item.id)}
                  aria-label={`${isLiked ? "Unlike" : "Like"} ${item.name}`}
                  className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full"
                  style={{ backgroundColor: "#0A0804BB" }}
                >
                  <Heart
                    size={13}
                    fill={isLiked ? "#C9A84C" : "none"}
                    stroke={isLiked ? "#C9A84C" : "#8A7A60"}
                  />
                </button>
              </div>

              {/* Card body */}
              <div className="flex flex-col flex-1 p-2.5 gap-1.5">
                {/* Name EN + AR */}
                <div>
                  <h3
                    className="font-serif font-semibold leading-tight"
                    style={{ color: "#F0E8D6", fontSize: "12px" }}
                  >
                    {item.name}
                  </h3>
                  <p
                    className="font-sans leading-tight"
                    dir="rtl"
                    style={{ color: "#8A7A60", fontSize: "9px" }}
                  >
                    {item.arabic}
                  </p>
                </div>

                {/* Era / Period label */}
                <div
                  className="flex items-center gap-1 px-1.5 py-0.5 rounded-md self-start"
                  style={{ backgroundColor: "#C9A84C11", border: "1px solid #C9A84C22" }}
                >
                  <span className="font-sans" style={{ color: "#C9A84C99", fontSize: "8px" }}>
                    {item.era}
                  </span>
                  <span style={{ color: "#C9A84C44", fontSize: "8px" }}>·</span>
                  <span className="font-sans" style={{ color: "#8A7A60", fontSize: "8px" }}>
                    {item.period}
                  </span>
                </div>

                {/* Condition badge */}
                <div
                  className="flex items-center gap-1 px-1.5 py-0.5 rounded-md self-start"
                  style={{
                    backgroundColor: cond.bg,
                    border: `1px solid ${cond.border}`,
                  }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: cond.color }}
                  />
                  <span className="font-sans font-semibold" style={{ color: cond.color, fontSize: "9px" }}>
                    {item.condition}
                  </span>
                </div>

                {/* Star rating */}
                <div className="flex items-center gap-1">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={8}
                        fill={s <= Math.round(item.rating) ? "#C9A84C" : "#2A2015"}
                        stroke="none"
                      />
                    ))}
                  </div>
                  <span className="font-sans" style={{ color: "#C9A84C", fontSize: "9px" }}>
                    {item.rating}
                  </span>
                  <span className="font-sans" style={{ color: "#8A7A60", fontSize: "9px" }}>
                    ({item.reviews})
                  </span>
                </div>

                {/* Current Bid */}
                <div
                  className="rounded-lg p-2"
                  style={{ backgroundColor: "#C9A84C11", border: "1px solid #C9A84C22" }}
                >
                  <p className="font-sans text-xs" style={{ color: "#8A7A60" }}>
                    Current Bid
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span
                      className="font-serif font-bold"
                      style={{ color: "#C9A84C", fontSize: "16px", lineHeight: 1 }}
                    >
                      π
                    </span>
                    <span
                      className="font-serif font-bold"
                      style={{ color: "#F0E8D6", fontSize: "15px", lineHeight: 1 }}
                    >
                      {currentBids[item.id] !== undefined ? currentBids[item.id] : item.price}
                    </span>
                  </div>
                </div>

                {/* Min bid info */}
                <p className="font-sans text-xs" style={{ color: "#8A7A60" }}>
                  Min bid: π {Math.ceil((currentBids[item.id] !== undefined ? currentBids[item.id] : item.price) * 1.05 * 10) / 10}
                </p>

                {/* Place Bid button */}
                <button
                  onClick={() => openBidModal(item.id)}
                  disabled={isEnded}
                  className="w-full py-1.5 rounded-xl font-sans font-bold text-xs transition-all flex items-center justify-center gap-1.5"
                  style={
                    isEnded
                      ? {
                          backgroundColor: "#2A2015",
                          color: "#666",
                          border: "1px solid #1A1510",
                        }
                      : {
                          background: "linear-gradient(135deg, #C9A84C 0%, #A8833A 100%)",
                          color: "#0A0804",
                        }
                  }
                >
                  {isEnded ? "Auction Ended" : "🔨 Place Bid"}
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Bidding Modal */}
      {selectedItem && (
        <AuctionBidModal
          isOpen={bidModalOpen}
          itemName={selectedItem.name}
          currentBid={currentBids[selectedItem.id] !== undefined ? currentBids[selectedItem.id] : selectedItem.price}
          minNextBid={minNextBid}
          onClose={() => setBidModalOpen(false)}
          onSubmit={handleBidSubmit}
        />
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div
          className="fixed bottom-24 left-1/2 -translate-x-1/2 px-4 py-3 rounded-lg font-sans font-semibold text-sm animate-fade-in"
          style={{
            backgroundColor: "#4ADE8033",
            color: "#4ADE80",
            border: "1px solid #166534",
            zIndex: 100,
          }}
        >
          {toastMessage}
        </div>
      )}
    </section>
  );
}
