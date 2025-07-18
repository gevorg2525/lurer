/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["newsbook.am", "localhost"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "newsbook.am",
                port: "",
                pathname: "/uploads/**",
            },
        ],
    },
};

export default nextConfig;
