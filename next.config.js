/** @type {import('next').NextConfig} */
const isDevelopment = process.env.NODE_ENV === "development";
const devWatchIgnorePattern =
  /(^|[\\/])(?:\.git|\.next|node_modules)(?:[\\/]|$)|(?:^|[\\/])next-dev(?:-\d+)?\.log$|(?:^|[\\/])next-dev(?:-\d+)?\.err\.log$|\.log$/;

const cspDirectives = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${isDevelopment ? "'unsafe-eval'" : ""} https://cdn.jsdelivr.net https://pagead2.googlesyndication.com https://*.googlesyndication.com https://googleads.g.doubleclick.net https://*.doubleclick.net https://partner.googleadservices.com https://adservice.google.com https://fundingchoicesmessages.google.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  isDevelopment
    ? "connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:*"
    : "connect-src 'self' https://pagead2.googlesyndication.com https://*.googlesyndication.com https://googleads.g.doubleclick.net https://*.doubleclick.net https://partner.googleadservices.com https://adservice.google.com https://fundingchoicesmessages.google.com",
  "frame-src https://googleads.g.doubleclick.net https://*.doubleclick.net https://tpc.googlesyndication.com https://*.googlesyndication.com https://fundingchoicesmessages.google.com",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
  !isDevelopment ? "upgrade-insecure-requests" : "",
].filter(Boolean);

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: cspDirectives.join("; ").replace(/\s{2,}/g, " ").trim(),
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=(), accelerometer=(), gyroscope=(), magnetometer=()",
  },
  ...(!isDevelopment
    ? [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ]
    : []),
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },
  {
    key: "Cross-Origin-Resource-Policy",
    value: "same-origin",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "X-Permitted-Cross-Domain-Policies",
    value: "none",
  },
];

const nextConfig = {
  compress: true,
  poweredByHeader: false,
  webpack(config, { dev }) {
    if (dev) {
      config.watchOptions = {
        ...(config.watchOptions || {}),
        ignored: devWatchIgnorePattern,
      };
    }

    return config;
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [360, 414, 640, 768, 1024, 1280, 1440],
    imageSizes: [64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.openai.com",
      },
    ],
  },
  turbopack: {
    root: __dirname,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      ...[
        "/favicon.ico",
        "/favicon-32x32.png",
        "/favicon-48x48.png",
        "/favicon-192x192.png",
        "/favicon-v3.ico",
        "/favicon-v3-16x16.png",
        "/favicon-v3-32x32.png",
        "/favicon-v3-48x48.png",
        "/favicon-v3-192x192.png",
        "/favicon-v4.ico",
        "/favicon-v4-16x16.png",
        "/favicon-v4-32x32.png",
        "/favicon-v4-48x48.png",
        "/favicon-v4-192x192.png",
        "/apple-touch-icon.png",
        "/apple-touch-icon-v3.png",
        "/apple-touch-icon-v4.png",
      ].map((source) => ({
        source,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      })),
      {
        source: "/site.webmanifest",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
      {
        source: "/brand/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/papers/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/pdf.worker.min.mjs",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.eceexamguide.com",
          },
        ],
        destination: "https://eceexamguide.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "eceexamguide.vercel.app",
          },
        ],
        destination: "https://eceexamguide.com/:path*",
        permanent: true,
      },
      {
        source: "/gate-2025-ece-question-paper",
        destination: "/solution/gate-2025",
        permanent: true,
      },
      {
        source: "/gate-previous-year-question-papers",
        destination: "/previous-year?exam=GATE",
        permanent: true,
      },
      {
        source: "/learn/networks/network-theorems-topic",
        destination: "/network-theorems",
        permanent: true,
      },
      {
        source: "/learn/digital/boolean-algebra-and-kmaps",
        destination: "/logic-gates-and-boolean-algebra",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
