/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // we ship pre-resized JPEGs to avoid Vercel Image Optimization complexity
  },
  trailingSlash: false,
  poweredByHeader: false,
};

export default nextConfig;