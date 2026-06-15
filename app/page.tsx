"use client";

import { useState } from "react";
import { CaveHeader } from "@/components/cave-header";
import { CaveTicker } from "@/components/cave-ticker";
import { CaveHero } from "@/components/cave-hero";
import { CaveFeatured } from "@/components/cave-featured";
import { CaveAuctions } from "@/components/cave-auctions";
import { CaveSellers } from "@/components/cave-sellers";
import { CavePiCTA, CaveBottomNav } from "@/components/cave-bottom";
import { CaveSellPage } from "@/components/cave-sell-page";
import { CaveSettingsPage } from "@/components/cave-settings-page";

export default function TheCavePage() {
  const [activeTab, setActiveTab] = useState(0);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const isSellTab = activeTab === 4;

  /* Settings page renders as a full-screen overlay */
  if (settingsOpen) {
    return (
      <div
        className="min-h-screen max-w-md mx-auto relative"
        style={{ backgroundColor: "#0A0804" }}
      >
        <CaveSettingsPage onBack={() => setSettingsOpen(false)} />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen max-w-md mx-auto relative"
      style={{ backgroundColor: "#0A0804" }}
    >
      {/* Fixed header */}
      <CaveHeader onSettingsOpen={() => setSettingsOpen(true)} />

      {/* Scrollable content — padded for fixed header (56px) and bottom nav (60px) */}
      <main className="pt-14 pb-20">
        {isSellTab ? (
          <>
            {/* Sell / Premium Listing page */}
            <CaveSellPage />
          </>
        ) : (
          <>
            {/* Ticker — sits right below header */}
            <CaveTicker />

            {/* Show different content based on active tab */}
            {activeTab === 0 && (
              <>
                {/* Home Tab - Show Auctions as main content */}
                <CaveHero />
                <div
                  className="mx-4 h-px"
                  style={{
                    background: "linear-gradient(90deg, transparent, #2A2015, transparent)",
                  }}
                />
                <CaveFeatured />
                <div
                  className="mx-4 h-px"
                  style={{
                    background: "linear-gradient(90deg, transparent, #2A2015, transparent)",
                  }}
                />
                <CaveAuctions />
                <div
                  className="mx-4 h-px"
                  style={{
                    background: "linear-gradient(90deg, transparent, #2A2015, transparent)",
                  }}
                />
                <CaveSellers />
                <div
                  className="mx-4 h-px"
                  style={{
                    background: "linear-gradient(90deg, transparent, #C9A84C44, transparent)",
                  }}
                />
                <CavePiCTA />
              </>
            )}

            {activeTab === 1 && (
              <>
                {/* Live Auctions Tab */}
                <CaveAuctions isFullPage={true} />
              </>
            )}

            {activeTab === 2 && (
              <>
                {/* Ending Soon Tab */}
                <section className="px-4 py-6">
                  <h2
                    className="font-serif font-bold mb-4"
                    style={{ color: "#F0E8D6", fontSize: "18px" }}
                  >
                    Ending Soon
                  </h2>
                  <p style={{ color: "#8A7A60" }}>Coming soon: Auctions ending in the next 24 hours</p>
                </section>
              </>
            )}

            {activeTab === 3 && (
              <>
                {/* My Bids Tab */}
                <section className="px-4 py-6">
                  <h2
                    className="font-serif font-bold mb-4"
                    style={{ color: "#F0E8D6", fontSize: "18px" }}
                  >
                    My Bids
                  </h2>
                  <p style={{ color: "#8A7A60" }}>Your active bids and bidding history</p>
                </section>
              </>
            )}

            {/* Footer - only on home tab */}
            {activeTab === 0 && (
              <footer
                className="px-4 py-6 text-center border-t"
                style={{ borderColor: "#2A2015" }}
              >
                <p
                  className="font-serif italic font-bold mb-1"
                  style={{ color: "#C9A84C", fontSize: "18px" }}
                >
                  TheCave
                </p>
                <p
                  className="font-sans text-xs"
                  dir="rtl"
                  style={{ color: "#8A7A60" }}
                >
                  تحف ونوادر — منصة البائعين والمقتنيات
                </p>
                <p
                  className="font-sans text-xs mt-3"
                  style={{ color: "#8A7A60", fontSize: "10px" }}
                >
                  Powered by Pi Network · {new Date().getFullYear()} TheCave
                </p>
              </footer>
            )}
          </>
        )}
      </main>

      {/* Fixed bottom navigation */}
      <CaveBottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
