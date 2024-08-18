// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',

  devtools: { enabled: false },

  build: {
    transpile: ['vuetify'],
  },
  modules: [
    '@sidebase/nuxt-auth',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  auth: {
    isEnabled: false,
    baseURL: `${process.env.BASE_URL || 'http://localhost:8080/api'}/auth`,
    globalAppMiddleware: true,
    provider: {
      refreshOnlyToken: false,
      type: 'refresh',
      endpoints: {
        signIn: { path: '/login', method: 'post' },
        signUp: { path: '/register', method: 'post' },
        getSession: { path: '/profile', method: 'get' },
        refresh: { path: '/refresh', method: 'post' },
      },
      token: {
        signInResponseTokenPointer: '/data/accessToken',
        type: 'Bearer',
        maxAgeInSeconds: 60 * 60 * 24 * 7, // 7 days
        sameSiteAttribute: 'lax',
      },
      refreshToken: {
        signInResponseRefreshTokenPointer: '/data/refreshToken',
        maxAgeInSeconds: 60 * 60 * 24 * 30, // 30 days
      },
    },
  },
  
})
