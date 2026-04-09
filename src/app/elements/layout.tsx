import type { Metadata } from "next";
import { Noto_Sans_SC } from "next/font/google";
import type { ReactNode } from "react";

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sc-elements",
});

export const metadata: Metadata = {
  title: "月球化学元素 | Moon Chemical Elements",
  description: "月球化学元素组成与分布",
};

export default function ElementsLayout({ children }: { children: ReactNode }) {
  return <div className={notoSansSC.variable}>{children}</div>;
}
