import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  devIndicators: {
    appIsrStatus: false,
    buildActivity: false,
  },

  images: {
    domains: ["img.icons8.com"],
  },
};

export default nextConfig;
