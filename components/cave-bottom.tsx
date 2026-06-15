"use client";

const NAV_TABS = [
  { 
    label: "Home", 
    arabic: "الرئيسية",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    )
  },
  { 
    label: "Live Auctions", 
    arabic: "مزادات مباشرة",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l4 2" />
      </svg>
    )
  },
  { 
    label: "Ending Soon", 
    arabic: "ينتهي قريباً",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        <path d="M12 6v6l4 2" />
      </svg>
    )
  },
  { 
    label: "My Bids", 
    arabic: "عروضي",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
        <polyline points="17 21 17 13 7 13 7 21" />
      </svg>
    )
  },
  { 
    label: "Sell", 
    arabic: "بيع",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
    )
  },
];

interface CaveBottomNavProps {
  activeTab: number;
  onTabChange: (index: number) => void;
}

export function CaveBottomNav({ activeTab, onTabChange }: CaveBottomNavProps) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-5"
      style={{ backgroundColor: "#0A0804", borderTop: "1px solid #2A2015" }}
      role="navigation"
      aria-label="Main navigation"
    >
      {NAV_TABS.map((tab, idx) => {
        const isActive = activeTab === idx;
        const isSell = idx === 4;
        return (
          <button
            key={tab.label}
            onClick={() => onTabChange(idx)}
            className="flex flex-col items-center justify-center py-2.5 gap-0.5 relative"
            aria-label={tab.label}
            aria-current={isActive ? "page" : undefined}
          >
            {/* Active indicator - subtle gold top border */}
            {isActive && (
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5"
                style={{ backgroundColor: "#C9A84C" }}
              />
            )}
            {/* Sell tab (index 4) gets a special pill background */}
            {isSell ? (
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: isActive ? "#C9A84C" : "#C9A84C22",
                  border: "1.5px solid #C9A84C",
                }}
              >
                <div
                  style={{ color: isActive ? "#0A0804" : "#C9A84C", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  {tab.icon}
                </div>
              </div>
            ) : (
              <div
                style={{ color: isActive ? "#C9A84C" : "#888" }}
              >
                {tab.icon}
              </div>
            )}
            <span
              className="font-sans"
              style={{
                color: isActive ? "#C9A84C" : "#888",
                fontSize: "9px",
              }}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

export function CavePiCTA() {
  return (
    <section className="px-4 py-6">
      <div
        className="rounded-2xl p-5 relative overflow-hidden"
        style={{
          backgroundColor: "#120F08",
          border: "1px solid #C9A84C44",
        }}
      >
        {/* Decorative corner */}
        <div
          className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-10"
          style={{ background: "radial-gradient(circle, #C9A84C, transparent)" }}
        />

        <div className="flex items-center gap-2 mb-3">
          <span
            className="font-serif font-bold text-3xl"
            style={{ color: "#C9A84C" }}
          >
            π
          </span>
          <div>
            <p
              className="font-serif font-bold leading-tight"
              style={{ color: "#F0E8D6", fontSize: "16px" }}
            >
              Pay with Pi Network
            </p>
            <p className="font-sans text-xs" style={{ color: "#8A7A60" }}>
              الدفع عبر شبكة باي
            </p>
          </div>
        </div>

        <p className="font-sans text-xs leading-relaxed mb-4" style={{ color: "#8A7A60" }}>
          TheCave exclusively uses Pi Network for all transactions. Secure, fast, and borderless payments worldwide.
        </p>

        <div className="flex gap-2">
          <button
            className="flex-1 py-3 rounded-xl font-sans font-semibold text-sm"
            style={{ backgroundColor: "#C9A84C", color: "#0A0804" }}
          >
            Start Selling
          </button>
          <button
            className="flex-1 py-3 rounded-xl font-sans font-semibold text-sm"
            style={{
              backgroundColor: "transparent",
              color: "#C9A84C",
              border: "1.5px solid #C9A84C",
            }}
          >
            Learn More
          </button>
        </div>
      </div>

      {/* How it works */}
      <div className="mt-6">
        <h3
          className="font-serif font-semibold mb-4 text-center"
          style={{ color: "#F0E8D6", fontSize: "16px" }}
        >
          How It Works
        </h3>
        <div className="space-y-3">
          {[
            {
              step: "01",
              title: "Browse & Discover",
              arabic: "تصفح واكتشف",
              desc: "Explore thousands of authenticated antiques from global sellers.",
            },
            {
              step: "02",
              title: "Place Your Bid or Buy",
              arabic: "قدم عطاءك أو اشتري",
              desc: "Use Pi to bid in live auctions or purchase at fixed price.",
            },
            {
              step: "03",
              title: "Secure Delivery",
              arabic: "توصيل آمن",
              desc: "Items shipped with full insurance and authenticity guarantee.",
            },
          ].map((step) => (
            <div
              key={step.step}
              className="flex gap-4 p-4 rounded-xl"
              style={{ backgroundColor: "#120F08", border: "1px solid #2A2015" }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-serif font-bold text-sm"
                style={{ backgroundColor: "#C9A84C22", color: "#C9A84C", border: "1px solid #C9A84C44" }}
              >
                {step.step}
              </div>
              <div>
                <p className="font-serif font-semibold text-sm" style={{ color: "#F0E8D6" }}>
                  {step.title}
                </p>
                <p className="font-sans text-xs" dir="rtl" style={{ color: "#C9A84C", fontSize: "10px" }}>
                  {step.arabic}
                </p>
                <p className="font-sans text-xs mt-1 leading-relaxed" style={{ color: "#8A7A60" }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
