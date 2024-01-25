/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
          'res.cloudinary.com',
          'api.cloudinary.com',
          'upload-widget.cloudinary.com'
        ]
    }
}

module.exports = nextConfig
