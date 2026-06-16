import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Allow mobile devices on the local network to access the dev server
  allowedDevOrigins: ["172.31.224.1", "192.168.*.*", "10.*.*.*"],
};

export default nextConfig;
