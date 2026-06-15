"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

interface AuctionCardProps {
  id: number;
  name: string;
  arabic: string;
  flag: string;
  country: string;
  condition: string;
  rating: number;
  reviews: number;
  currentBid: number;
  image: string;
  endTime: Date;
  isLive?: boolean;
}

export function CaveAuctionCard({ 
  id, 
  name, 
  arabic, 
  flag, 
  country, 
  condition, 
  rating, 
  reviews, 
  currentBid, 
  image, 
  endTime,
  isLive = true 
}: AuctionCardProps) {
  const [liked, setLiked] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState("");
  const [isEnded, setIsEnded] = useState(false);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const diff = endTime.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeRemaining("Ended");
        setIsEnded(true);
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (hours > 0) {
        setTimeRemaining(`${hours}h ${minutes}m`);
      } else if (minutes > 0) {
        setTimeRemaining(`${minutes}m ${seconds}s`);
      } else {
        setTimeRemaining(`${seconds}s`);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  const CONDITION_STYLE: Record<string, { bg: string; color: string; border: string }> = {
    Excellent: { bg: "#0A2010", color: "#4ADE80", border: "#166534" },
    Good: { bg: "#1A1200", color: "#FACC15", border: "#713F12" },
    Rare: { bg: "#1A0A1A", color: "#C084FC", border: "#6B21A8" },
  };

  const cond = CONDITION_STYLE[condition];

  return (
    <article
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{
        backgroundColor: "#1A1610",
        border: "1px solid #C9A84C33",
      }}
    >
      {/* Image with overlay gradient */}
      <div
        className="relative flex flex-col items-center justify-center overflow-hidden"
        style={{ height: "130px" }}
      >
        {/* Background image */}
        <img
          src={image}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark overlay gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(10, 8, 4, 0) 0%, rgba(10, 8, 4, 0.4) 60%, rgba(10, 8, 4, 0.7) 100%)",
          }}
        />

        {/* LIVE Badge */}
        {isLive && !isEnded && (
          <div
            className="absolute top-2 left-2 px-2 py-1 rounded-full flex items-center gap-1"
            style={{ backgroundColor: "#DC2626", animation: "pulse 2s infinite" }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: "#FCA5A5" }}
            />
            <span
              className="font-sans font-bold text-xs"
              style={{ color: "#FEE2E2" }}
            >
              LIVE
            </span>
          </div>
        )}

        {/* Countdown Timer */}
        <div
          className="absolute bottom-2 left-2 px-2 py-1 rounded-lg"
          style={{
            backgroundColor: isEnded ? "#1A1A1A" : "#0A0804BB",
            border: isEnded ? "1px solid #404040" : "1px solid #C9A84C44",
          }}
        >
          <span
            className="font-sans font-bold text-xs"
            style={{ color: isEnded ? "#666" : "#C9A84C" }}
          >
            {timeRemaining}
          </span>
        </div>

        {/* Like button */}
        <button
          onClick={() => setLiked(!liked)}
          aria-label={`${liked ? "Unlike" : "Like"} ${name}`}
          className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full"
          style={{ backgroundColor: "#0A0804BB" }}
        >
          <Heart
            size={13}
            fill={liked ? "#C9A84C" : "none"}
            stroke={liked ? "#C9A84C" : "#8A7A60"}
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
            {name}
          </h3>
          <p
            className="font-sans leading-tight"
            dir="rtl"
            style={{ color: "#8A7A60", fontSize: "9px" }}
          >
            {arabic}
          </p>
        </div>

        {/* Country + Condition */}
        <div className="flex items-center justify-between gap-1">
          <div
            className="flex items-center gap-1 px-1.5 py-0.5 rounded-md"
            style={{ backgroundColor: "#C9A84C11", border: "1px solid #C9A84C22" }}
          >
            <span style={{ fontSize: "11px" }}>{flag}</span>
            <span className="font-sans" style={{ color: "#C9A84C99", fontSize: "8px" }}>
              {country}
            </span>
          </div>
          <div
            className="flex items-center gap-1 px-1.5 py-0.5 rounded-md"
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
              {condition}
            </span>
          </div>
        </div>

        {/* Star rating */}
        <div className="flex items-center gap-1">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <svg
                key={s}
                width="8"
                height="8"
                viewBox="0 0 24 24"
                fill={s <= Math.round(rating) ? "#C9A84C" : "none"}
                stroke={s <= Math.round(rating) ? "#C9A84C" : "#2A2015"}
                strokeWidth="2"
              >
                <polygon points="12 2 15.09 10.26 24 10.35 17.77 16.01 20.16 24.02 12 18.35 3.84 24.02 6.23 16.01 0 10.35 8.91 10.26 12 2" />
              </svg>
            ))}
          </div>
          <span className="font-sans" style={{ color: "#C9A84C", fontSize: "9px" }}>
            {rating}
          </span>
          <span className="font-sans" style={{ color: "#8A7A60", fontSize: "9px" }}>
            ({reviews})
          </span>
        </div>

        {/* Current Bid */}
        <div className="bg-gradient-to-r from-yellow-900/30 to-transparent rounded-lg p-2">
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
              {currentBid}
            </span>
            <span className="font-sans" style={{ color: "#8A7A60", fontSize: "9px" }}>
              Pi
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <button
          disabled={isEnded}
          className="w-full py-2 rounded-xl font-sans font-bold text-xs transition-all"
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
                  border: "none",
                }
          }
        >
          {isEnded ? "Auction Ended" : "Place Bid"}
        </button>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </article>
  );
}
