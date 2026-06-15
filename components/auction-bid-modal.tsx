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
    if (!bidAmount || isNaN(bid)) { setError("Please enter a valid bid amount"); return; }
    if (bid < minNextBid) { setError(`Bid must be at least π ${minNextBid}`); return; }
    setError("");
    setIsSubmitting(true);
    try {
      if (!window.Pi) throw new Error("Pi SDK not available");
      window.Pi.createPayment(
        { amount: bid, memo: `Bid on ${itemName}`, metadata: { itemName, bidAmount: bid } },
        {
          onReadyForServerApproval: async (paymentId: string) => {
            await fetch(`/api/payments/${paymentId}/approve`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
            });
          },
          onReadyForServerCompletion: async (paymentId: string, txid: string) => {
            await fetch(`/api/payments/${paymentId}/complete`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ txid }),
            });
            onSubmit(bid);
            onClose();
          },
          onCancel: (_paymentId: string) => { setError("Payment cancelled"); setIsSubmitting(false); },
          onError: (err: Error) => { setError(err.message || "Payment failed"); setIsSubmitting(false); },
        }
      );
    } catch (err: any) {
      setError(err.message || "Failed to start payment");
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-40 transition-opacity" style={{ backgroundColor: "#0A0804CC" }} onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-sm mx-4 rounded-3xl overflow-hidden" style={{ backgroundColor: "#1A1610", border: "1px solid #C9A84C44" }}>
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: "#2A2015" }}>
          <h2 className="font-serif font-bold text-lg" style={{ color: "#F0E8D6" }}>Place Your Bid</h2>
          <button onClick={onClose} className="p-1 hover:opacity-70 transition-opacity" style={{ color: "#8A7A60" }}><X size={20} /></button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <p className="font-sans text-xs mb-1" style={{ color: "#8A7A60" }}>Item</p>
            <p className="font-serif font-semibold" style={{ color: "#F0E8D6" }}>{itemName}</p>
          </div>
          <div className="p-3 rounded-xl" style={{ backgroundColor: "#0A080488", border: "1px solid #C9A84C22" }}>
            <p className="font-sans text-xs mb-1" style={{ color: "#8A7A60" }}>Current Highest Bid</p>
            <div className="flex items-baseline gap-1">
              <span className="font-serif font-bold" style={{ color: "#C9A84C", fontSize: "18px" }}>π</span>
              <span className="font-serif font-bold" style={{ color: "#F0E8D6", fontSize: "16px" }}>{currentBid}</span>
            </div>
          </div>
          <div>
            <label className="font-sans text-xs mb-2 block" style={{ color: "#8A7A60" }}>Your Bid in Pi</label>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-lg" style={{ color: "#C9A84C" }}>π</span>
              <input
                type="number"
                value={bidAmount}
                onChange={(e) => { setBidAmount(e.target.value); setError(""); }}
                placeholder={minNextBid.toString()}
                min={minNextBid}
                step="0.1"
                className="flex-1 px-3 py-2 rounded-lg font-sans font-bold text-sm focus:outline-none"
                style={{ backgroundColor: "#0A080488", border: "1px solid #C9A84C44", color: "#F0E8D6" }}
              />
            </div>
            <p className="font-sans text-xs mt-1" style={{ color: "#8A7A60" }}>Minimum bid: π {minNextBid}</p>
          </div>
          {error && (
            <div className="p-2 rounded-lg" style={{ backgroundColor: "#8B2E2E33", border: "1px solid #FF6B6B44" }}>
              <p className="font-sans text-xs" style={{ color: "#FF6B6B" }}>{error}</p>
            </div>
          )}
        </div>
        <div className="flex gap-2 p-4 border-t" style={{ borderColor: "#2A2015" }}>
          <button onClick={onClose} disabled={isSubmitting} className="flex-1 py-2 rounded-xl font-sans font-bold text-sm" style={{ backgroundColor: "transparent", border: "1px solid #C9A84C44", color: "#C9A84C" }}>Cancel</button>
          <button onClick={handleSubmit} disabled={isSubmitting} className="flex-1 py-2 rounded-xl font-sans font-bold text-sm" style={{ background: "linear-gradient(135deg, #C9A84C 0%, #A8833A 100%)", color: "#0A0804", opacity: isSubmitting ? 0.7 : 1 }}>
            {isSubmitting ? "Processing..." : "Submit Bid with Pi"}
          </button>
        </div>
      </div>
    </>
  );
}
