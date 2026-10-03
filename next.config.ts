import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
