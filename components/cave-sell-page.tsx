"use client";

import { useState } from "react";
import { Sparkles, Tag, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { usePiAuth } from "@/contexts/pi-auth-context";
import { PRODUCT_CONFIG } from "@/lib/product-config";

type PaymentStatus = "idle" | "loading" | "success" | "error";

export function CaveSellPage() {
  const { products } = usePiAuth();
  const [status, setStatus] = useState<PaymentStatus>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const product = products?.find(
    (p) => p.id === PRODUCT_CONFIG.PRODUCT_69b4c1ca15be8dce49fb05d6
  );

  const amount = product?.price_in_pi ?? null;

  function handlePremiumPayment() {
    if (!product || amount === null) return;

    setStatus("loading");
    setErrorMsg(null);

    window.pay({
      amount,
      memo: product.name,
      metadata: { productId: product.id },
      onComplete: () => {
        setStatus("success");
      },
      onError: (error: Error) => {
        setStatus("error");
        setErrorMsg(error?.message ?? "Payment failed. Please try again.");
      },
    });
  }

  function resetStatus() {
    setStatus("idle");
    setErrorMsg(null);
  }

  return (
    <section className="px-4 py-6 space-y-4">
      {/* Page title */}
      <div className="mb-2">
        <h2
          className="font-serif font-bold text-balance"
          style={{ color: "#F0E8D6", fontSize: "22px" }}
        >
          List Your Item
        </h2>
        <p
          className="font-sans text-xs mt-1"
          dir="rtl"
          style={{ color: "#8A7A60" }}
        >
          أضف قطعتك للبيع في السوق
        </p>
      </div>

      {/* Standard Listing card */}
      <div
        className="rounded-2xl p-5 flex flex-col gap-3"
        style={{
          backgroundColor: "#120F08",
          border: "1px solid #2A2015",
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "#2A2015" }}
          >
            <Tag size={18} style={{ color: "#8A7A60" }} />
          </div>
          <div>
            <p
              className="font-serif font-semibold"
              style={{ color: "#F0E8D6", fontSize: "15px" }}
            >
              Standard Listing
            </p>
            <p className="font-sans text-xs" style={{ color: "#8A7A60" }}>
              Free · Basic visibility
            </p>
          </div>
        </div>

        <ul className="space-y-1.5 pl-1">
          {[
            "Listed in general catalogue",
            "Visible to all buyers",
            "Basic item details",
          ].map((f) => (
            <li key={f} className="flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: "#8A7A60" }}
              />
              <span className="font-sans text-xs" style={{ color: "#8A7A60" }}>
                {f}
              </span>
            </li>
          ))}
        </ul>

        <button
          className="w-full py-3 rounded-xl font-sans font-semibold text-sm"
          style={{
            backgroundColor: "transparent",
            color: "#8A7A60",
            border: "1.5px solid #2A2015",
          }}
        >
          Create Standard Listing
        </button>
      </div>

      {/* Premium Listing card */}
      <div
        className="rounded-2xl p-5 flex flex-col gap-3 relative overflow-hidden"
        style={{
          backgroundColor: "#120F08",
          border: "1.5px solid #C9A84C",
        }}
      >
        {/* Subtle gold glow top-right */}
        <div
          className="absolute top-0 right-0 w-28 h-28 rounded-bl-full opacity-10 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #C9A84C, transparent)",
          }}
        />

        {/* Badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#C9A84C22", border: "1px solid #C9A84C44" }}
            >
              <Sparkles size={18} style={{ color: "#C9A84C" }} />
            </div>
            <div>
              <p
                className="font-serif font-semibold"
                style={{ color: "#C9A84C", fontSize: "15px" }}
              >
                {product?.name ?? "Premium Listing"}
              </p>
              <p className="font-sans text-xs" style={{ color: "#8A7A60" }}>
                {product?.description ??
                  "Maximum visibility to buyers worldwide"}
              </p>
            </div>
          </div>

          <span
            className="font-serif font-bold text-xs px-2 py-0.5 rounded-full flex-shrink-0"
            style={{
              backgroundColor: "#C9A84C22",
              color: "#C9A84C",
              border: "1px solid #C9A84C44",
            }}
          >
            Featured
          </span>
        </div>

        {/* Features */}
        <ul className="space-y-1.5 pl-1">
          {[
            "Pinned to top of search results",
            "Featured on homepage carousel",
            "Bold gold badge on your listing",
            "Priority buyer notifications",
          ].map((f) => (
            <li key={f} className="flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: "#C9A84C" }}
              />
              <span className="font-sans text-xs" style={{ color: "#F0E8D6" }}>
                {f}
              </span>
            </li>
          ))}
        </ul>

        {/* Price */}
        <div className="flex items-baseline gap-1.5">
          <span
            className="font-serif font-bold"
            style={{ color: "#C9A84C", fontSize: "28px" }}
          >
            π
          </span>
          <span
            className="font-serif font-bold"
            style={{ color: "#C9A84C", fontSize: "28px" }}
          >
            {amount !== null ? amount.toFixed(1) : "—"}
          </span>
          <span className="font-sans text-xs" style={{ color: "#8A7A60" }}>
            Pi per listing
          </span>
        </div>

        {/* Success state */}
        {status === "success" && (
          <div
            className="flex items-center gap-2 rounded-xl px-4 py-3"
            style={{ backgroundColor: "#0D1F0D", border: "1px solid #2A5C2A" }}
          >
            <CheckCircle2 size={18} style={{ color: "#4CAF50" }} />
            <p className="font-sans text-xs" style={{ color: "#4CAF50" }}>
              Premium listing activated! Your item is now featured.
            </p>
          </div>
        )}

        {/* Error state */}
        {status === "error" && errorMsg && (
          <div
            className="flex items-start gap-2 rounded-xl px-4 py-3"
            style={{ backgroundColor: "#1F0D0D", border: "1px solid #5C2A2A" }}
          >
            <XCircle size={18} className="flex-shrink-0 mt-0.5" style={{ color: "#F44336" }} />
            <p className="font-sans text-xs" style={{ color: "#F44336" }}>
              {errorMsg}
            </p>
          </div>
        )}

        {/* CTA button */}
        {status === "success" ? (
          <button
            onClick={resetStatus}
            className="w-full py-3 rounded-xl font-sans font-semibold text-sm"
            style={{ backgroundColor: "#2A2015", color: "#C9A84C" }}
          >
            List Another Item
          </button>
        ) : (
          <button
            onClick={status === "error" ? resetStatus : handlePremiumPayment}
            disabled={!product || amount === null || status === "loading"}
            className="w-full py-3 rounded-xl font-sans font-semibold text-sm flex items-center justify-center gap-2 transition-opacity"
            style={{
              backgroundColor:
                !product || amount === null
                  ? "#2A2015"
                  : "#C9A84C",
              color:
                !product || amount === null ? "#8A7A60" : "#0A0804",
              opacity: status === "loading" ? 0.7 : 1,
              cursor:
                !product || amount === null || status === "loading"
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            {status === "loading" ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Processing Payment…
              </>
            ) : status === "error" ? (
              "Try Again"
            ) : !product ? (
              "Unavailable"
            ) : (
              <>
                <Sparkles size={16} />
                Get Premium Listing · π{amount?.toFixed(1)}
              </>
            )}
          </button>
        )}

        {/* Not found notice */}
        {!product && products !== null && (
          <p
            className="font-sans text-xs text-center"
            style={{ color: "#8A7A60" }}
          >
            Premium listing is currently unavailable. Please try again later.
          </p>
        )}
      </div>

      {/* Info note */}
      <p
        className="font-sans text-xs text-center leading-relaxed px-2"
        style={{ color: "#8A7A60" }}
      >
        Payments are processed securely via Pi Network. Premium status activates immediately after confirmation.
      </p>
    </section>
  );
}
