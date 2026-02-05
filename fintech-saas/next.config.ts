import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["recharts"], // Often needed for recharts in Next.js
  /* @ts-ignore - Turbopack root is a valid but sometimes untyped key */
  turbopack: {
    root: "../../",
  },
};

export default nextConfig;
