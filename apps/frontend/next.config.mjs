/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'recharts',
      'framer-motion',
      '@tanstack/react-query',
      'clsx',
      'tailwind-merge',
    ],
  },
};

export default nextConfig;
