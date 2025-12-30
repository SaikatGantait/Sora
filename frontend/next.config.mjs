/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
  },
  async rewrites() {
    const backendBase = process.env.NEXT_PUBLIC_BACKEND_ORIGIN || 'http://localhost:4000'
    return [
      {
        source: '/api/:path*',
        destination: `${backendBase}/api/:path*`,
      },
    ]
  },
};

export default nextConfig;