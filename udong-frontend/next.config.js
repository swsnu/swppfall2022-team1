/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    publicRuntimeConfig: {
        backendUrl: process.env.NEXT_PUBLIC_BASE_URL,
    },
    images: {
        unoptimized: true,
    },
}

module.exports = nextConfig
