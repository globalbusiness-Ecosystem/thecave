"use client";

import { useState } from "react";
import { ShoppingCart, AlertCircle, CheckCircle } from "lucide-react";
import { usePiAuth } from "@/contexts/pi-auth-context";
import { PRODUCT_CONFIG } from "@/lib/product-config";

// Type declarations for Pi SDK
declare global {
  interface Window {
    SDKLite: {
      init: () => {
        makePurchase: (productId: string) => Promise<{
          ok: boolean;
          productId?: string;
          paymentId?: string;
          txid?: string;
          error?: string;
          code?: string;
        }>;
        state: {
          consume: (productId: string, quantity: number) => Promise<void>;
        };
      };
    };
  }
}

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
      <button
        disabled
        className="w-full py-1.5 rounded-xl font-sans font-bold text-xs opacity-50 cursor-not-allowed"
        style={{
          background: "linear-gradient(135deg, #C9A84C 0%, #A8833A 100%)",
          color: "#0A0804",
        }}
      >
        Loading...
      </button>
    );
  }

  const handlePurchase = async () => {
    setIsLoading(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      // Check if SDK is available
      if (!window.SDKLite) {
        throw new Error("Pi Network SDK not available");
      }

      const sdk = window.SDKLite.init();
      if (!sdk) {
        throw new Error("Failed to initialize Pi SDK");
      }

      // Make the purchase
      const result = await sdk.makePurchase(product.id);

      if (result && result.ok) {
        setStatus("success");
        setIsLoading(false);

        // Call success callback if provided
        if (onSuccess) {
          onSuccess(result.productId, result.paymentId, result.txid);
        }

        // Reset success state after 2 seconds
        setTimeout(() => {
          setStatus("idle");
        }, 2000);
      } else {
        throw new Error(result?.error || "Purchase failed");
      }
    } catch (err: any) {
      const errorCode = err?.code;
      let userMessage = "Purchase failed. Please try again.";

      if (errorCode === "product_not_found") {
        userMessage = "Product not found.";
      } else if (errorCode === "purchase_cancelled") {
        userMessage = "Purchase cancelled.";
      } else if (errorCode === "purchase_error") {
        userMessage = "Payment error. Please try again.";
      } else if (err?.message) {
        userMessage = err.message;
      }

      setErrorMessage(userMessage);
      setStatus("error");
      setIsLoading(false);

      if (onError) {
        onError(userMessage);
      }

      // Reset error state after 3 seconds
      setTimeout(() => {
        setStatus("idle");
        setErrorMessage("");
      }, 3000);
    }
  };

  const getButtonContent = () => {
    if (isLoading) {
      return (
        <>
          <span className="inline-block animate-spin mr-1">⏳</span>
          Processing...
        </>
      );
    }

    if (status === "success") {
      return (
        <>
          <CheckCircle size={variant === "compact" ? 12 : 14} />
          Purchase Complete!
        </>
      );
    }

    if (status === "error") {
      return (
        <>
          <AlertCircle size={variant === "compact" ? 12 : 14} />
          {errorMessage}
        </>
      );
    }

    return (
      <>
        <ShoppingCart size={variant === "compact" ? 12 : 14} />
        Buy π{product.price_in_pi} ({product.name})
      </>
    );
  };

  const buttonStyle = (() => {
    if (status === "success") {
      return { backgroundColor: "#4ADE8033", color: "#4ADE80", border: "1px solid #166534" };
    }
    if (status === "error") {
      return { backgroundColor: "#FF6B6B33", color: "#FF6B6B", border: "1px solid #8B2E2E" };
    }
    return {
      background: "linear-gradient(135deg, #C9A84C 0%, #A8833A 100%)",
      color: "#0A0804",
    };
  })();

  return (
    <button
      onClick={handlePurchase}
      disabled={isLoading || status !== "idle"}
      className={`flex items-center gap-1.5 justify-center py-1.5 rounded-xl font-sans font-bold transition-all disabled:opacity-75 ${
        variant === "compact" ? "text-xs px-2" : "text-xs px-3"
      } ${className}`}
      style={buttonStyle}
      aria-label={`Purchase ${product.name} for π${product.price_in_pi}`}
    >
      {getButtonContent()}
    </button>
  );
}
