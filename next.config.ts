import type { NextConfig } from "next";

// PREVIEW_EXPORT=1 builds a static copy for design reviews.
const previewExport = process.env.PREVIEW_EXPORT === "1";

// Response headers for the hosted site. Static exports can't send headers, so
// configure the same values at the host if the site is deployed as static files.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  ...(previewExport
    ? { output: "export", images: { unoptimized: true } }
    : { headers: async () => [{ source: "/:path*", headers: securityHeaders }] }),
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
