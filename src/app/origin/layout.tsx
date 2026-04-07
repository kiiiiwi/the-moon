import type { Metadata } from "next";
import { Noto_Sans_SC } from "next/font/google";
import type { ReactNode } from "react";

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sc-origin",
});

export const metadata: Metadata = {
  title: "月球的起源与演化 | Moon",
  description: "探索月球从诞生到沉寂的六个关键演化阶段。",
};

export default function OriginLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${notoSansSC.variable} [font-family:var(--font-noto-sc-origin),_var(--font-geist-sans),_sans-serif]`}>
      {children}
    </div>
  );
}
