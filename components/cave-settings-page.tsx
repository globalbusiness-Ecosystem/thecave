"use client";

import { useState } from "react";
import {
  Sun,
  Moon,
  Monitor,
  Globe,
  DollarSign,
  Bell,
  BellOff,
  ChevronRight,
  Info,
  Check,
  ArrowLeft,
  Smartphone,
} from "lucide-react";

const SECTION_DIVIDER = (
  <div className="mx-4 h-px" style={{ backgroundColor: "#2A2015" }} />
);

/* ── Reusable row ── */
function SettingsRow({
  label,
  sublabel,
  value,
  onClick,
  children,
}: {
  label: string;
  sublabel?: string;
  value?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-4 py-3.5"
      style={{ backgroundColor: "transparent" }}
    >
      <div className="flex flex-col items-start gap-0.5">
        <span className="font-sans text-sm" style={{ color: "#F0E8D6" }}>
          {label}
        </span>
        {sublabel && (
          <span className="font-sans text-xs" style={{ color: "#8A7A60" }}>
            {sublabel}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        {value && (
          <span className="font-sans text-xs" style={{ color: "#C9A84C" }}>
            {value}
          </span>
        )}
        {children ?? <ChevronRight size={14} style={{ color: "#8A7A60" }} />}
      </div>
    </button>
  );
}

/* ── Section wrapper ── */
function SettingsSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-2">
      <p
        className="font-sans text-xs font-semibold uppercase tracking-widest px-4 pt-5 pb-2"
        style={{ color: "#C9A84C", letterSpacing: "0.12em" }}
      >
        {title}
      </p>
      <div
        className="mx-4 rounded-xl overflow-hidden"
        style={{ backgroundColor: "#0F0B06", border: "1px solid #2A2015" }}
      >
        {children}
      </div>
    </div>
  );
}

/* ── Toggle switch ── */
function Toggle({
  on,
  onToggle,
}: {
  on: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      aria-checked={on}
      role="switch"
      className="relative w-11 h-6 rounded-full transition-colors duration-200"
      style={{ backgroundColor: on ? "#C9A84C" : "#2A2015" }}
    >
      <span
        className="absolute top-0.5 w-5 h-5 rounded-full transition-transform duration-200"
        style={{
          backgroundColor: on ? "#0A0804" : "#8A7A60",
          transform: on ? "translateX(22px)" : "translateX(2px)",
        }}
      />
    </button>
  );
}

/* ── Option sheet ── */
function OptionSheet({
  title,
  options,
  selected,
  onSelect,
  onClose,
}: {
  title: string;
  options: { label: string; value: string }[];
  selected: string;
  onSelect: (v: string) => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end" onClick={onClose}>
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(10,8,4,0.75)" }}
      />
      <div
        className="relative rounded-t-2xl pb-8"
        style={{ backgroundColor: "#0F0B06", border: "1px solid #2A2015" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between px-5 py-4 border-b"
          style={{ borderColor: "#2A2015" }}
        >
          <p
            className="font-serif italic font-semibold"
            style={{ color: "#C9A84C", fontSize: "17px" }}
          >
            {title}
          </p>
          <button
            onClick={onClose}
            className="font-sans text-sm"
            style={{ color: "#8A7A60" }}
          >
            Cancel
          </button>
        </div>
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => {
              onSelect(opt.value);
              onClose();
            }}
            className="w-full flex items-center justify-between px-5 py-3.5 border-b last:border-0"
            style={{ borderColor: "#1A1510" }}
          >
            <span className="font-sans text-sm" style={{ color: "#F0E8D6" }}>
              {opt.label}
            </span>
            {selected === opt.value && (
              <Check size={16} style={{ color: "#C9A84C" }} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   Main Settings Page
════════════════════════════════════════ */
export function CaveSettingsPage({ onBack }: { onBack: () => void }) {
  /* ── state ── */
  const [theme, setTheme] = useState<"dark" | "light" | "system">("dark");
  const [language, setLanguage] = useState("en");
  const [currency, setCurrency] = useState("pi");

  const [notifNew, setNotifNew] = useState(true);
  const [notifBid, setNotifBid] = useState(true);
  const [notifPayment, setNotifPayment] = useState(true);
  const [notifNewsletter, setNotifNewsletter] = useState(false);

  const [sheet, setSheet] = useState<null | "theme" | "language" | "currency">(null);

  const THEME_OPTIONS = [
    { label: "Dark", value: "dark" },
    { label: "Light", value: "light" },
    { label: "System Default", value: "system" },
  ];

  const LANGUAGE_OPTIONS = [
    { label: "English", value: "en" },
    { label: "Arabic — العربية", value: "ar" },
    { label: "French — Français", value: "fr" },
    { label: "Spanish — Español", value: "es" },
    { label: "Turkish — Türkçe", value: "tr" },
  ];

  const CURRENCY_OPTIONS = [
    { label: "Pi (π)", value: "pi" },
    { label: "USD — US Dollar", value: "usd" },
    { label: "EUR — Euro", value: "eur" },
    { label: "SAR — Saudi Riyal", value: "sar" },
    { label: "AED — UAE Dirham", value: "aed" },
  ];

  const themeLabel = THEME_OPTIONS.find((o) => o.value === theme)?.label ?? "Dark";
  const langLabel = LANGUAGE_OPTIONS.find((o) => o.value === language)?.label ?? "English";
  const currLabel = CURRENCY_OPTIONS.find((o) => o.value === currency)?.label ?? "Pi (π)";

  const ThemeIcon =
    theme === "dark" ? Moon : theme === "light" ? Sun : Monitor;

  return (
    <>
      {/* Page */}
      <div
        className="min-h-screen"
        style={{ backgroundColor: "#0A0804" }}
      >
        {/* Top bar */}
        <div
          className="flex items-center gap-3 px-4 h-14 sticky top-0 z-10"
          style={{ backgroundColor: "#0A0804", borderBottom: "1px solid #2A2015" }}
        >
          <button
            onClick={onBack}
            className="w-8 h-8 flex items-center justify-center rounded-lg"
            style={{ color: "#C9A84C" }}
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1">
            <p
              className="font-serif italic font-bold"
              style={{ color: "#C9A84C", fontSize: "18px", lineHeight: 1 }}
            >
              Settings
            </p>
            <p className="font-sans" style={{ color: "#8A7A60", fontSize: "10px" }}>
              الإعدادات
            </p>
          </div>
        </div>

        <div className="pb-10">
          {/* ── Appearance ── */}
          <SettingsSection title="Appearance">
            <SettingsRow
              label="Theme"
              sublabel="Display color scheme"
              value={themeLabel}
              onClick={() => setSheet("theme")}
            >
              <div className="flex items-center gap-2">
                <ThemeIcon size={14} style={{ color: "#C9A84C" }} />
                <span className="font-sans text-xs" style={{ color: "#C9A84C" }}>
                  {themeLabel}
                </span>
                <ChevronRight size={14} style={{ color: "#8A7A60" }} />
              </div>
            </SettingsRow>
          </SettingsSection>

          {/* ── Language & Region ── */}
          <SettingsSection title="Language & Region">
            <SettingsRow
              label="Language"
              sublabel="App display language"
              value={langLabel}
              onClick={() => setSheet("language")}
            >
              <div className="flex items-center gap-2">
                <Globe size={14} style={{ color: "#C9A84C" }} />
                <span className="font-sans text-xs" style={{ color: "#C9A84C" }}>
                  {langLabel.split(" —")[0]}
                </span>
                <ChevronRight size={14} style={{ color: "#8A7A60" }} />
              </div>
            </SettingsRow>
            <div className="h-px mx-3" style={{ backgroundColor: "#1A1510" }} />
            <SettingsRow
              label="Currency"
              sublabel="Display prices in"
              onClick={() => setSheet("currency")}
            >
              <div className="flex items-center gap-2">
                <DollarSign size={14} style={{ color: "#C9A84C" }} />
                <span className="font-sans text-xs" style={{ color: "#C9A84C" }}>
                  {currLabel.split(" —")[0]}
                </span>
                <ChevronRight size={14} style={{ color: "#8A7A60" }} />
              </div>
            </SettingsRow>
          </SettingsSection>

          {/* ── Notifications ── */}
          <SettingsSection title="Notifications">
            <SettingsRow label="New Item Alerts" sublabel="Items matching your interests">
              <Toggle on={notifNew} onToggle={() => setNotifNew((v) => !v)} />
            </SettingsRow>
            <div className="h-px mx-3" style={{ backgroundColor: "#1A1510" }} />
            <SettingsRow label="Bid Updates" sublabel="Activity on your bids">
              <Toggle on={notifBid} onToggle={() => setNotifBid((v) => !v)} />
            </SettingsRow>
            <div className="h-px mx-3" style={{ backgroundColor: "#1A1510" }} />
            <SettingsRow label="Payment Receipts" sublabel="Confirmations & invoices">
              <Toggle on={notifPayment} onToggle={() => setNotifPayment((v) => !v)} />
            </SettingsRow>
            <div className="h-px mx-3" style={{ backgroundColor: "#1A1510" }} />
            <SettingsRow label="Newsletter" sublabel="Curated antique news">
              <Toggle on={notifNewsletter} onToggle={() => setNotifNewsletter((v) => !v)} />
            </SettingsRow>
          </SettingsSection>

          {/* ── About ── */}
          <SettingsSection title="About">
            <SettingsRow
              label="App Version"
              sublabel="TheCave for Pi Network"
            >
              <span className="font-sans text-xs" style={{ color: "#8A7A60" }}>
                v1.0.0
              </span>
            </SettingsRow>
            <div className="h-px mx-3" style={{ backgroundColor: "#1A1510" }} />
            <SettingsRow label="Domain" sublabel="Official marketplace URL">
              <span className="font-sans text-xs" style={{ color: "#C9A84C" }}>
                thecave.market
              </span>
            </SettingsRow>
            <div className="h-px mx-3" style={{ backgroundColor: "#1A1510" }} />
            <SettingsRow label="Pi Network" sublabel="Powered by Pi blockchain">
              <div className="flex items-center gap-1.5">
                <span
                  className="font-serif font-bold"
                  style={{ color: "#C9A84C", fontSize: "14px" }}
                >
                  π
                </span>
                <ChevronRight size={14} style={{ color: "#8A7A60" }} />
              </div>
            </SettingsRow>
            <div className="h-px mx-3" style={{ backgroundColor: "#1A1510" }} />
            <SettingsRow label="Terms & Privacy" sublabel="Legal information">
              <ChevronRight size={14} style={{ color: "#8A7A60" }} />
            </SettingsRow>
          </SettingsSection>

          {/* App tagline */}
          <div className="px-4 pt-6 text-center">
            <p
              className="font-serif italic"
              style={{ color: "#C9A84C", fontSize: "15px" }}
            >
              TheCave
            </p>
            <p className="font-sans text-xs mt-1" style={{ color: "#8A7A60" }}>
              Antiques & Collectibles on Pi Network
            </p>
            <p
              className="font-sans mt-1"
              style={{ color: "#4A3A28", fontSize: "10px" }}
            >
              thecave.market
            </p>
          </div>
        </div>
      </div>

      {/* Option Sheets */}
      {sheet === "theme" && (
        <OptionSheet
          title="Theme"
          options={THEME_OPTIONS}
          selected={theme}
          onSelect={(v) => setTheme(v as typeof theme)}
          onClose={() => setSheet(null)}
        />
      )}
      {sheet === "language" && (
        <OptionSheet
          title="Language"
          options={LANGUAGE_OPTIONS}
          selected={language}
          onSelect={setLanguage}
          onClose={() => setSheet(null)}
        />
      )}
      {sheet === "currency" && (
        <OptionSheet
          title="Currency"
          options={CURRENCY_OPTIONS}
          selected={currency}
          onSelect={setCurrency}
          onClose={() => setSheet(null)}
        />
      )}
    </>
  );
}
