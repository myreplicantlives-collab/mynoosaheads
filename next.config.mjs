/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Sprint 1.1 has no imagery yet; TSK-2957-03 will revisit
  },
  trailingSlash: false,
  poweredByHeader: false,
};

export default nextConfig;