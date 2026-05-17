/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
          'res.cloudinary.com',
          'api.cloudinary.com',
          'upload-widget.cloudinary.com',
          'api.dicebear.com',
        ],
    },
    experimental: {
        serverActions: true,
    },
}

module.exports = nextConfig
