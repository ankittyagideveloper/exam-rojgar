export const manifestForPlugIn = {
  registerType: "autoUpdate",

  includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],

  manifest: {
    name: "Exam Rojgaar",
    short_name: "Exam Rojgaar",
    description:
      "Exam Rojgaar Test Series one of the best online test platform in India for railway, ssc departmental exams.",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      {
        src: "/maskable_icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    theme_color: "#ffffff",
    background_color: "#f0e7db",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },

  workbox: {
    clientsClaim: true,
    skipWaiting: true,
    cleanupOutdatedCaches: true,

    // 🚫 NEVER cache index.html
    globPatterns: ["**/*.{js,css,ico,png,svg,woff2}"],

    navigateFallbackDenylist: [/^\/api/],
  },

  runtimeCaching: [
    // 🔥 API must be NetworkFirst
    {
      urlPattern: ({ url }) => url.pathname.startsWith("/api/v1/data"),
      handler: "NetworkFirst",
      options: {
        cacheName: "api-cache",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 5, // only 5 minutes
        },
        cacheableResponse: { statuses: [0, 200] },
      },
    },
  ],

  devOptions: {
    enabled: true,
  },
};
