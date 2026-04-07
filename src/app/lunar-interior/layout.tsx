import type { Metadata } from "next";
import { Noto_Sans_SC } from "next/font/google";
import type { ReactNode } from "react";

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sc-lunar-interior",
});

export const metadata: Metadata = {
  title: "Lunar Interior | Moon",
  description: "Information related to the internal structure of the Moon.",
};

export default function LunarInteriorLayout({ children }: { children: ReactNode }) {
  return <div className={notoSansSC.variable}>{children}</div>;
}
