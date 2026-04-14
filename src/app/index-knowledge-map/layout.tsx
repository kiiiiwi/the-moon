import type { Metadata } from "next";
import { Noto_Sans_SC } from "next/font/google";

const notoSansSc = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-index-knowledge-map",
});

export const metadata: Metadata = {
  title: "Index | The Moon",
  description: "探索月球知识图谱，查看月球概览、环境、地质与探月活动关联。",
};

export default function IndexKnowledgeMapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={notoSansSc.className}>{children}</div>;
}

