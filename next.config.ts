import type { NextConfig } from "next";

// PREVIEW_EXPORT=1 builds a static copy for design reviews.
const previewExport = process.env.PREVIEW_EXPORT === "1";

const nextConfig: NextConfig = {
  trailingSlash: true,
  ...(previewExport
    ? { output: "export", images: { unoptimized: true } }
    : { cacheComponents: true, partialPrefetching: true }),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
