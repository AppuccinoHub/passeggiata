import type { NextConfig } from "next";

const pagesBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // GitHub Pages serves the site at /passeggiata, not at the domain root.
  ...(pagesBase
    ? {
        output: "export" as const,
        basePath: pagesBase,
        assetPrefix: pagesBase,
        trailingSlash: true,
        distDir: ".next-pages",
      }
    : {}),
  // Any host may open the dev server: a phone, a preview, a tunnel.
  // Without this, Next refuses the dev socket and the page never starts.
  allowedDevOrigins: ["127.0.0.1", "172.30.0.2", "172.17.0.1", "**.trycloudflare.com"],
  // The debug channel waits on that same socket before React can run.
  // If the socket is refused, the evening sits there loading.
  experimental: {
    reactDebugChannel: false,
  },
  devIndicators: false,
};

export default nextConfig;
