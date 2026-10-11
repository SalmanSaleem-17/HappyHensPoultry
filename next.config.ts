import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Order form accepts a payment receipt upload (5 MB) plus form fields.
      bodySizeLimit: "6mb",
    },
  },
  images: {
    loader: "custom",
    loaderFile: "./utils/imageLoader.ts",
  },
};

export default nextConfig;
