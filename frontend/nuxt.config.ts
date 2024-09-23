// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxtjs/tailwindcss", "nuxt-server-utils"],
  nitro: {
    plugins: ["~/server/index.ts"],
  },
  runtimeConfig: {
    mongodbUri: 'mongodb://mongodb:27017/mydb'
  }
})