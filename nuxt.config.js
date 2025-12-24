// Storyblok integration removed - content can be added manually

// TODO: Add site title + description
// TODO: Add 1200x630 "image.png" to static
// TODO: Add 512px "icon.png" to static
// TODO: Add Google Analytics variable to buildModules
// TODO: Add rel="noreferrer" to all links (prevents window object access)

// Add the "Lazy" prefix in your templates to enable lazyload components

module.exports = {
  target: "static",
  head: {
    title: "NEW VENTUS", // Change in package.json files
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover"
      },
      {
        hid: "description",
        name: "description",
        content:
          "New Ventus is here to shake up conventional filmmaking. We believe in agile filmmaking without setting boundaries when aiming for perfection. With style, fresh views and endless passion we aim to transform the unwieldy film industry by telling stories that matter, without unnecessary chitchat." // Change in package.json files
      },
      {
        name: "mobile-web-app-capable",
        content: "yes"
      },
      {
        name: "apple-mobile-web-app-capable",
        content: "yes"
      },
      {
        name: "apple-mobile-web-app-status-bar-style",
        content: "black-translucent"
      },
      {
        // Change if needed
        name: "theme-color",
        content: "#ffffff"
      },
      { property: "og:image", content: "/image.png" }
    ],
    link: [{ rel: "icon", type: "image/png", href: "/icon.png" }]
  },

  // Loading animation
  loading: false,

  // Auto import components (disabled - Storyblok components have issues)
  components: false,

  // Register CSS files
  css: [
    "@/assets/styles/reset.css",
    // "@/assets/styles/form-reset.css",
    "@/assets/styles/transitions.sass",
    "@/assets/styles/typography.sass",
    "@/assets/styles/body.sass"
  ],

  // Register plugins
  plugins: [
    // "~/plugins/components", // Commented out - Storyblok components
    "~/plugins/filters",
    "~/plugins/vue-lazyload"
    // "~/plugins/vue-scrollto"
  ],

  // Register modules
  modules: [
    "@nuxtjs/axios"
    // "vue-scrollto/nuxt"
  ],

  // Generate routes
  generate: {
    // Fallback to prevent Netlify from directing to its own error pages
    fallback: true
  },

  // Modules only run on build
  buildModules: [
    [
      "@nuxtjs/pwa",
      {
        icon: false // disables the icon module due dynamic favicon
      }
    ],
    "@nuxtjs/style-resources",
    "@aceforth/nuxt-optimized-images"
    // [
    //   "@nuxtjs/google-analytics",
    //   {
    //     id: process.env.GA_ID
    //   }
    // ]
  ],

  // Settings for "@nuxtjs/style-resources"
  styleResources: {
    sass: "./assets/styles/vars/*.sass"
  },

  // Settings for "@aceforth/nuxt-optimized-images"
  optimizedImages: {
    optimizeImages: true
  },

  // Settings for PWA
  pwa: {
    icon: false
  },

  // Run on build
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save (DISABLED - eslint-loader incompatible with ESLint v8)
      // Use `npm run lint` to check for errors instead
      /*
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        })
      }
      */
      // Fixes dotenv error
      config.node = {
        fs: "empty"
      }
    },
    // Transpile GSAP for server side rendering
    transpile: ["gsap"]
  }
}
