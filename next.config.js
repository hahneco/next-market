/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  pageExtensions: ['mdx', 'jsx', 'js', 'ts', 'tsx']
}

module.exports = nextConfig
