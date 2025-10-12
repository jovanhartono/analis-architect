import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    minimumCacheTTL: 3600 * 24 * 30 * 12, // 1 year
    formats: ["image/avif", "image/webp"],
    qualities: [75, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tfslhhlj4cdsasg9.public.blob.vercel-storage.com",
        search: "",
        port: "",
      },
    ],
  },
};

export default withPayload(nextConfig);
