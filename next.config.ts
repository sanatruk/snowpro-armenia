import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/snowpro-armenia",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
