/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://be.forum.yasapintar.my.id/:path*'
      }
    ]
  }
};

module.exports = nextConfig;
