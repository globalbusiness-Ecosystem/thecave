import type React from "react";
import type { Metadata } from "next";
import { Playfair_Display, Tajawal } from "next/font/google";
import { AppWrapper } from "@/components/app-wrapper";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  title: "Made with App Studio",
  description:
    "TheCave — antiques & collectibles marketplace on Pi Network. Buy, sell and discover valuable vintage items worldwide.",
    generator: 'v0.app'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${tajawal.variable}`}>
      <head />
      <body>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
