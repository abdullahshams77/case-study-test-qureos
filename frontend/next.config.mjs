/** @type {import('next').NextConfig} */
const nextConfig = {
  // async headers() {
  //   return [
  //     {
  //       // This matches all static files in the /_next/static/ folder
  //       source: "/_next/static/:path*",
  //       headers: [
  //         {
  //           key: "Cache-Control",
  //           value: "public, max-age=10800, must-revalidate", // Cache for 3 hours
  //         },
  //       ],
  //     },
  //     {
  //       // This matches all files in the /static/ folder
  //       source: "/assets/:path*",
  //       headers: [
  //         {
  //           key: "Cache-Control",
  //           value: "public, max-age=10800, must-revalidate", // Cache for 3 hours
  //         },
  //       ],
  //     },
  //   ];
  // },
  productionBrowserSourceMaps: false,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'example.com',
      }
    ]
  }
};

export default nextConfig;
// module.exports = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'amazonaws.com',
//         //port: '',
//         //pathname: '/account123/**',
//       },
//     ],
//   },
// }