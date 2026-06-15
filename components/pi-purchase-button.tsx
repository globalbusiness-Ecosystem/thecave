"use client";

import { useState } from "react";
import { ShoppingCart, AlertCircle, CheckCircle } from "lucide-react";
import { usePiAuth } from "@/contexts/pi-auth-context";
import { PRODUCT_CONFIG } from "@/lib/product-config";

interface PiPurchaseButtonProps {
  productConfigKey: keyof typeof PRODUCT_CONFIG;
  className?: string;
  variant?: "default" | "compact";
  onSuccess?: (productId: string, paymentId: string, txid: string) => void;
  onError?: (error: string) => void;
}

export function PiPurchaseButton({
  productConfigKey,
  className = "",
  variant = "default",
  onSuccess,
  onError,
}: PiPurchaseButtonProps) {
  const { products } = usePiAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const productId = PRODUCT_CONFIG[productConfigKey];
  const product = products?.find((p) => p.id === productId);

  if (!product) {
    return (
      <button disabled className="w-full py-1.5 rounded-xl font-sans font-bold text-xs opacity-50 cursor-not-allowed"
        style={{ background: "linear-gradient(135deg, #C9A84C 0%, #A8833A 100%)", color: "#0A0804" }}>
        Loading...
      </button>
    );
  }

  const handlePurchase = async () => {
    setIsLoading(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      if (!window.Pi) throw new Error("Pi Network SDK not available");

      window.Pi.createPayment(
        {
          amount: product.price_in_pi,
          memo: `Purchase: ${product.name}`,
          metadata: { productId: product.id },
        },
        {
          onReadyForServerApproval: async (paymentId: string) => {
            await fetch(`/api/payments/${paymentId}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ action: "approve" }),
            });
          },
          onReadyForServerCompletion: async (paymentId: string, txid: string) => {
            await fetch(`/api/payments/${paymentId}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ action: "complete", txid }),
            });
            setStatus("success");
            setIsLoading(false);
            if (onSuccess) onSuccess(product.id, paymentId, txid);
            setTimeout(() => setStatus("idle"), 2000);
          },
          onCancel: () => {
            setErrorMessage("Purchase cancelled.");
            setStatus("error");
            setIsLoading(false);
            setTimeout(() => { setStatus("idle"); setErrorMessage(""); }, 3000);
          },
          onError: (err: any) => {
            setErrorMessage(err?.message || "Payment error.");
            setStatus("error");
            setIsLoading(false);
            if (onError) onError(err?.message || "Payment error.");
            setTimeout(() => { setStatus("idle"); setErrorMessage(""); }, 3000);
          },
        }
      );
    } catch (err: any) {
      setErrorMessage(err.message || "Purchase failed.");
      setStatus("error");
      setIsLoading(false);
      setTimeout(() => { setStatus("idle"); setErrorMessage(""); }, 3000);
    }
  };

  const getButtonContent = () => {
    if (isLoading) return <><span className="inline-block animate-spin mr-1">⏳</span>Processing...</>;
    if (status === "success") return <><CheckCircle size={14} />Purchase Complete!</>;
    if (status === "error") return <><AlertCircle size={14} />{errorMessage}</>;
    return <><ShoppingCart size={variant === "compact" ? 12 : 14} />Buy π{product.price_in_pi} ({product.name})</>;
  };

  const buttonStyle = status === "success"
    ? { backgroundColor: "#4ADE8033", color: "#4ADE80", border: "1px solid #166534" }
    : status === "error"
    ? { backgroundColor: "#FF6B6B33", color: "#FF6B6B", border: "1px solid #8B2E2E" }
    : { background: "linear-gradient(135deg, #C9A84C 0%, #A8833A 100%)", color: "#0A0804" };

  return (
    <button onClick={handlePurchase} disabled={isLoading || status !== "idle"}
      className={`flex items-center gap-1.5 justify-center py-1.5 rounded-xl font-sans font-bold transition-all disabled:opacity-75 ${variant === "compact" ? "text-xs px-2" : "text-xs px-3"} ${className}`}
      style={buttonStyle}>
      {getButtonContent()}
    </button>
  );
}
