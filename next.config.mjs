/** @type {import('next').NextConfig} */
const nextConfig = {
  // 代理后端服务器
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/:path*',
      },
    ];
  },
};

export default nextConfig;
