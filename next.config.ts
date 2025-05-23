import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "plus.unsplash.com",
        protocol: "https",
        port: "",
      },
      {
        hostname: "lh3.googleusercontent.com",
        protocol: "https",
        port: "",
      },
       {
        hostname: "i.scdn.co",
        protocol: "https",
        port: "",
      }
    ]
  },
};

export default nextConfig;
