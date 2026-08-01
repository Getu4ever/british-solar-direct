import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // FIX: Force Turbopack to bypass bundling the Prisma binary dependencies
  serverExternalPackages: ["@prisma/client", "prisma"],
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;
