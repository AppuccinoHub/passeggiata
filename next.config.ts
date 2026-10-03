import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Opening the app at 127.0.0.1 is treated as cross-origin. Without this,
  // the dev channel is blocked and the page stays a picture that cannot be clicked.
  allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;
