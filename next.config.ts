import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const basePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
};

if (isGitHubPages) {
  nextConfig.output = "export";
  nextConfig.trailingSlash = true;
  nextConfig.images = {
    unoptimized: true,
  };

  if (basePath) {
    nextConfig.basePath = basePath;
  }
}

function normalizeBasePath(value?: string) {
  if (!value || value === "/") {
    return "";
  }

  return value.startsWith("/") ? value.replace(/\/$/, "") : `/${value}`;
}

export default nextConfig;
