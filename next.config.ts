import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://fakestoreapi.com/img/**')],
  },
  /* config options here */
};

export default nextConfig;
