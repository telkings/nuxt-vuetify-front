// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    strict: false,
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/scripts","@pinia/nuxt"],
  css: ["vuetify/styles"], // Agrega Vuetify a los estilos globales
  build: {
    transpile: ["vuetify"], // Asegura que Vuetify se transpile correctamente
  },
  css: ["@/assets/global.css"],
});
