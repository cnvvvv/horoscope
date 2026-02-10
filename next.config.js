/** @type {import('next', 'next/image')} */

const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // !! auto
  },
  images: {
    remotePatterns: [],
    unoptimized: false,
    domains: ['horoscope.vercel.app', 'horoscope-cnvvvv.vercel.app']
  }
}

module.exports = nextConfig
