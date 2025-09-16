import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    formats: ["image/avif", "image/webp"],
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
