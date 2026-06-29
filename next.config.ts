import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // FIX: Force Turbopack to bypass bundling the Prisma binary dependencies
  serverExternalPackages: ["@prisma/client", "prisma"],
};

export default nextConfig;
