const API_URL = process.env.NEXT_PUBLIC_API_URL;

module.exports = {
    reactStrictMode: true,
    poweredByHeader: false,
    images: {
        imageSizes: [
            16, 32, 48, 64, 128, 256, 384, 512, 720, 960, 1280, 1366, 1536, 1920, 2200, 2560
        ]
    },
    basePath: "/ponpub",
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: `${API_URL}/api/:path*`,
                basePath: false
            },
            {
                source: "/static/:path*",
                destination: `${API_URL}/static/:path*`,
                basePath: false
            }
        ];
    }
};
