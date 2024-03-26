// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', 'nuxt-headlessui', '@nuxt/ui'],
  colorMode: {
    preference: "light"
  },
  headlessui: {
    prefix: 'Headless'
  },
  routeRules: {
    '/pages/developmentDocuments/panel.vue': {ssr: false}
  }
})
