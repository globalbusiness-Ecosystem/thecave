"use client";

import { useState } from "react";
import { Menu, X, Settings, ChevronRight, LogOut } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", arabic: "الرئيسية" },
  { label: "Browse", arabic: "تصفح" },
  { label: "Sell", arabic: "بيع" },
  { label: "Auctions", arabic: "المزادات" },
  { label: "Favorites", arabic: "المفضلة" },
  { label: "My Orders", arabic: "طلباتي" },
  { label: "About", arabic: "حول" },
];

interface CaveHeaderProps {
  onSettingsOpen: () => void;
}

export function CaveHeader({ onSettingsOpen }: CaveHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* ── Fixed Header ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-14"
        style={{ backgroundColor: "#0A0804", borderBottom: "1px solid #2A2015" }}
      >
        {/* Left: Hamburger */}
        <button
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
          className="w-9 h-9 flex items-center justify-center rounded-lg"
          style={{ color: "#C9A84C" }}
        >
          <Menu size={22} />
        </button>

        {/* Center: Logo + domain */}
        <div className="flex flex-col items-center leading-none gap-0">
          <span
            className="font-serif italic font-bold tracking-wide"
            style={{ color: "#C9A84C", fontSize: "22px", lineHeight: 1.1 }}
          >
            TheCave
          </span>
          <span
            className="font-sans text-center"
            style={{ color: "#8A7A60", fontSize: "9px", letterSpacing: "0.08em" }}
          >
            تحف ونوادر
          </span>
          <span
            className="font-sans"
            style={{ color: "#4A3A28", fontSize: "8px", letterSpacing: "0.06em" }}
          >
            thecave.market
          </span>
        </div>

        {/* Right: Settings gear */}
        <button
          aria-label="Open settings"
          onClick={onSettingsOpen}
          className="w-9 h-9 flex items-center justify-center rounded-lg"
          style={{ color: "#C9A84C" }}
        >
          <Settings size={20} />
        </button>
      </header>

      {/* ── Slide-in Sidebar ── */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(10,8,4,0.82)" }}
            onClick={() => setMenuOpen(false)}
          />

          {/* Drawer */}
          <div
            className="relative flex flex-col w-72 h-full z-10 py-6"
            style={{ backgroundColor: "#0F0B06", borderRight: "1px solid #2A2015" }}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 mb-8">
              <div className="flex flex-col gap-0.5">
                <span
                  className="font-serif italic font-bold"
                  style={{ color: "#C9A84C", fontSize: "24px", lineHeight: 1 }}
                >
                  TheCave
                </span>
                <span className="font-sans" style={{ color: "#8A7A60", fontSize: "11px" }}>
                  تحف ونوادر
                </span>
                <span className="font-sans" style={{ color: "#4A3A28", fontSize: "10px" }}>
                  thecave.market
                </span>
              </div>
              <button
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
                style={{ color: "#8A7A60" }}
              >
                <X size={20} />
              </button>
            </div>

            {/* User card */}
            <div
              className="mx-5 mb-6 p-3 rounded-xl flex items-center gap-3"
              style={{ backgroundColor: "#1A1510", border: "1px solid #2A2015" }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-serif font-bold shrink-0"
                style={{
                  backgroundColor: "#C9A84C22",
                  border: "1px solid #C9A84C44",
                  color: "#C9A84C",
                  fontSize: "16px",
                }}
              >
                A
              </div>
              <div className="min-w-0">
                <p
                  className="font-sans font-semibold truncate"
                  style={{ color: "#F0E8D6", fontSize: "14px" }}
                >
                  Ali Hassan
                </p>
                <p className="font-sans" style={{ color: "#C9A84C", fontSize: "12px" }}>
                  π 10 Pi balance
                </p>
              </div>
            </div>

            {/* Nav items */}
            <nav className="flex-1 px-5 space-y-0.5 overflow-y-auto">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.label}
                  onClick={() => setMenuOpen(false)}
                  className="w-full flex items-center justify-between px-3 py-3 rounded-xl transition-colors"
                  style={{ color: "#F0E8D6" }}
                >
                  <div className="flex flex-col items-start">
                    <span className="font-sans text-sm">{item.label}</span>
                    <span className="font-sans" style={{ color: "#8A7A60", fontSize: "11px" }}>
                      {item.arabic}
                    </span>
                  </div>
                  <ChevronRight size={14} style={{ color: "#C9A84C" }} />
                </button>
              ))}
            </nav>

            {/* Bottom: Settings shortcut + Sign out */}
            <div className="px-5 pt-4 border-t space-y-0.5" style={{ borderColor: "#2A2015" }}>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onSettingsOpen();
                }}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl font-sans text-sm"
                style={{ color: "#C9A84C" }}
              >
                <Settings size={16} />
                Settings
              </button>
              <button
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl font-sans text-sm"
                style={{ color: "#8A7A60" }}
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
