import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    loader: "custom",
    loaderFile: "./utils/imageLoader.ts",
  },
};

export default nextConfig;
