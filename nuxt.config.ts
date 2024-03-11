// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    "nuxt-quasar-ui"
  ],
  css: [
    "~/assets/scss/main.scss", 
    "~/assets/scss/contents.scss",    
    // "bootstrap/dist/css/bootstrap.css"    
  ],
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=500, initial-scale=1',
      title: 'MeFeed',
      link: [
        {
          href:"https://fonts.googleapis.com/icon?family=Material+Icons+Outlined", 
          rel: "stylesheet"
        },
        {
          href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css",
          rel: "stylesheet" ,
          integrity: "sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN",
          crossorigin: "anonymous"
        }
      ],
      script: [
        {
          src: "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js",          
        },
        {
          src: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js",
          integrity: "sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL",
          crossorigin: "anonymous",
          type: "text/javascript",
        }
      ]
    }
  },
  quasar: { /* */ }
})
