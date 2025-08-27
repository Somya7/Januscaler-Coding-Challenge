import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss' // just this
  ],
  app: {
    head: { title: 'Nuxt + Janus Challenge' }
  },
  imports: {
    dirs: ['composables']
  }
})
