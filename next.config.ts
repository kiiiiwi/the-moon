import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const basePath = isGithubActions && repositoryName ? `/${repositoryName}` : "";

const nextConfig: NextConfig = {
  /** 开发环境下隐藏左下角 Next.js 指示器（N 图标） */
  devIndicators: false,
  output: "export",
  trailingSlash: true,
  images: {
    // GitHub Pages 仅托管静态资源，不支持 Next.js 图片优化服务
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath || undefined,
};

export default nextConfig;
