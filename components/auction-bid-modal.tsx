"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface AuctionBidModalProps {
  isOpen: boolean;
  itemName: string;
  currentBid: number;
  minNextBid: number;
  onClose: () => void;
  onSubmit: (bidAmount: number) => void;
}

export function AuctionBidModal({
  isOpen,
  itemName,
  currentBid,
  minNextBid,
  onClose,
  onSubmit,
}: AuctionBidModalProps) {
  const [bidAmount, setBidAmount] = useState<string>(minNextBid.toString());
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    const bid = parseFloat(bidAmount);

    // Validation
    if (!bidAmount || isNaN(bid)) {
      setError("Please enter a valid bid amount");
      return;
    }

    if (bid < minNextBid) {
      setError(`Bid must be at least π ${minNextBid}`);
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      // Simulate submission delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      onSubmit(bid);
      setBidAmount(minNextBid.toString());
      onClose();
    } catch (err) {
      setError("Failed to submit bid. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 transition-opacity"
        style={{ backgroundColor: "#0A0804CC" }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-sm mx-4 rounded-3xl overflow-hidden"
        style={{ backgroundColor: "#1A1610", border: "1px solid #C9A84C44" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-4 border-b"
          style={{ borderColor: "#2A2015" }}
        >
          <h2
            className="font-serif font-bold text-lg"
            style={{ color: "#F0E8D6" }}
          >
            Place Your Bid
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:opacity-70 transition-opacity"
            style={{ color: "#8A7A60" }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          {/* Item name */}
          <div>
            <p className="font-sans text-xs mb-1" style={{ color: "#8A7A60" }}>
              Item
            </p>
            <p
              className="font-serif font-semibold"
              style={{ color: "#F0E8D6" }}
            >
              {itemName}
            </p>
          </div>

          {/* Current highest bid */}
          <div
            className="p-3 rounded-xl"
            style={{ backgroundColor: "#0A080488", border: "1px solid #C9A84C22" }}
          >
            <p className="font-sans text-xs mb-1" style={{ color: "#8A7A60" }}>
              Current Highest Bid
            </p>
            <div className="flex items-baseline gap-1">
              <span
                className="font-serif font-bold"
                style={{ color: "#C9A84C", fontSize: "18px" }}
              >
                π
              </span>
              <span
                className="font-serif font-bold"
                style={{ color: "#F0E8D6", fontSize: "16px" }}
              >
                {currentBid}
              </span>
            </div>
          </div>

          {/* Bid input */}
          <div>
            <label className="font-sans text-xs mb-2 block" style={{ color: "#8A7A60" }}>
              Your Bid in Pi
            </label>
            <div className="flex items-center gap-2">
              <span
                className="font-serif font-bold text-lg"
                style={{ color: "#C9A84C" }}
              >
                π
              </span>
              <input
                type="number"
                value={bidAmount}
                onChange={(e) => {
                  setBidAmount(e.target.value);
                  setError("");
                }}
                placeholder={minNextBid.toString()}
                min={minNextBid}
                step="0.1"
                className="flex-1 px-3 py-2 rounded-lg font-sans font-bold text-sm focus:outline-none"
                style={{
                  backgroundColor: "#0A080488",
                  border: "1px solid #C9A84C44",
                  color: "#F0E8D6",
                }}
              />
            </div>
            <p className="font-sans text-xs mt-1" style={{ color: "#8A7A60" }}>
              Minimum bid: π {minNextBid}
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div
              className="p-2 rounded-lg"
              style={{ backgroundColor: "#8B2E2E33", border: "1px solid #FF6B6B44" }}
            >
              <p className="font-sans text-xs" style={{ color: "#FF6B6B" }}>
                {error}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className="flex gap-2 p-4 border-t"
          style={{ borderColor: "#2A2015" }}
        >
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1 py-2 rounded-xl font-sans font-bold text-sm transition-all"
            style={{
              backgroundColor: "transparent",
              border: "1px solid #C9A84C44",
              color: "#C9A84C",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 py-2 rounded-xl font-sans font-bold text-sm transition-all"
            style={{
              background: "linear-gradient(135deg, #C9A84C 0%, #A8833A 100%)",
              color: "#0A0804",
              opacity: isSubmitting ? 0.7 : 1,
            }}
          >
            {isSubmitting ? "Submitting..." : "Submit Bid with Pi"}
          </button>
        </div>
      </div>
    </>
  );
}
