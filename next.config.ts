import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The old Vercel address keeps working: every page moves permanently to the same path on johnadrian.dev.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "my-portfolio-rebranded.vercel.app" }],
        destination: "https://johnadrian.dev/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
