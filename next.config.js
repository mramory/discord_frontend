/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
          'res.cloudinary.com',
          'api.cloudinary.com',
          'upload-widget.cloudinary.com',
        ],
    },
    experimental: {
        serverActions: true,
    },
}

module.exports = nextConfig
