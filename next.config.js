const { i18n } = require("./next-i18next.config");

const imageHostPatterns = (protocol, hostname, port = "") => [
    { protocol, hostname, port, pathname: "/images/**" },
    { protocol, hostname, port, pathname: "/static/**" },
];

// The object storage host configured for the current build (MinIO / S3), e.g. http://127.0.0.1:9000.
const configuredImagesHost = (() => {
    try {
        return process.env.NEXT_PUBLIC_IMAGES_HOST_URL ? new URL(process.env.NEXT_PUBLIC_IMAGES_HOST_URL) : null;
    } catch {
        return null;
    }
})();

const isLocalImagesHost = ["127.0.0.1", "localhost"].includes(configuredImagesHost?.hostname ?? "");

// SVGs imported from code become React components; viewBox must survive optimization so icons can be resized.
const svgrLoader = {
    loader: "@svgr/webpack",
    options: {
        svgoConfig: {
            plugins: [{ name: "preset-default", params: { overrides: { removeViewBox: false } } }],
        },
    },
};

/** @type {import("next").NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    i18n,
    compiler: {
        styledComponents: true,
    },
    images: {
        minimumCacheTTL: 432000,
        // Next.js 16 blocks optimizing images from private IPs by default; local MinIO needs it.
        dangerouslyAllowLocalIP: isLocalImagesHost,
        remotePatterns: [
            ...imageHostPatterns("http", "127.0.0.1", "9000"),
            ...imageHostPatterns("http", "dev.s3.filezon.com"),
            ...imageHostPatterns("https", "s3.filezon.com"),
            ...(configuredImagesHost
                ? imageHostPatterns(
                      configuredImagesHost.protocol.replace(":", ""),
                      configuredImagesHost.hostname,
                      configuredImagesHost.port
                  )
                : []),
        ],
    },
    turbopack: {
        rules: {
            "*.svg": {
                loaders: [svgrLoader],
                as: "*.js",
            },
        },
    },
};

module.exports = nextConfig;
