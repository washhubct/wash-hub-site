import type { NextConfig } from "next";

// basePath vuoto quando usi dominio custom (wash-hub.it), /wash-hub-site per staging GitHub Pages
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '/wash-hub-site'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath,
};

export default nextConfig;
