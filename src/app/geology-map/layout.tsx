import type { Metadata } from "next";
import { Noto_Sans_SC } from "next/font/google";
import type { ReactNode } from "react";

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sc-geology",
});

export const metadata: Metadata = {
  title: "Geology Map | The Moon",
  description: "Interactive lunar geology map with points of interest.",
};

export default function GeologyMapLayout({ children }: { children: ReactNode }) {
  return <div className={notoSansSC.variable}>{children}</div>;
}
