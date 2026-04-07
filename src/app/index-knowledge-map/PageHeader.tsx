"use client";

import Link from "next/link";

export default function PageHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
          style={{
            border: "1px solid rgba(193, 250, 248, 0.4)",
            color: "#C1FAF8",
            boxShadow: "0 0 15px rgba(193, 250, 248, 0.15)",
          }}
        >
          ← 返回主页面
        </Link>

        <button
          className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
          style={{
            border: "1px solid #F1D088",
            color: "#F1D088",
            boxShadow: "0 0 15px rgba(241, 208, 136, 0.2)",
          }}
        >
          开始探索
        </button>
      </div>
    </header>
  );
}

