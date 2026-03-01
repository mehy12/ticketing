import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: __dirname,
  },
  allowedDevOrigins: ['*'],
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    remotePatterns: [
      {
        hostname: '**',
        protocol: 'https',

      }
    ]
  }
};

export default nextConfig;
