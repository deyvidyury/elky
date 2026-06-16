import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // Allow mobile devices on the local network to access the dev server
  // Next.js 15 does NOT support wildcards — use exact IPs only
  allowedDevOrigins: ["192.168.100.4", "192.168.100.4:3000", "localhost", "localhost:3000"],
};

export default nextConfig;
