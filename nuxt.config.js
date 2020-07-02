const bodyParser = require('body-parser');
const axios = require('axios');

export default {
  mode: 'universal',
  // mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    // title: process.env.npm_package_name || '',
    title: 'My Blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'My Cool Web Development Blog' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap'},
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  // loading: false,
  // loading: { color: '#FF0000', failedColor: 'yellow' },
  // loading: { color: '#FF0000', height: '4px', duration: 5000 }, // doesn't know about axios request/ default is not determine any request
  // loadingIndicator: { name: 'circle',color: '#fa923f' }, //only work when mode is SPA
  /*
  ** Global CSS
  */
  css: [
    '~assets/styles/main.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/core-components.js',
    '~plugins/date-filter.js',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
  ],
  axios: {
    baseURL: process.env.BASE_URL || 'https://nuxt-blog-a3d84.firebaseio.com',  // Remember about baseURL insted of baseUrl
    // debug: true,
    credentials: false
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  // dev: true,
  env: {
    baseUrl: process.env.BASE_URL || 'https://nuxt-blog-a3d84.firebaseio.com',
    fbAPIKey: 'AIzaSyAHfthYLg85KSqymE7UAXYeX00hwG93zw8',
  },
  // rootDir: '/my-beautiful-app',  // by default it is '/'
  router: {
    // middleware: 'log',
    // base: '/my-beautiful-app/',
    // extendRoutes(routes, resolve) {
    //   routes.push({
    //     path: '*',
    //     component: resolve(__dirname, 'pages/index.vue')
    //   })
    // },

    // linkActiveClass: 'active' // active current nav

  },
   // srcDir: 'client-app/',
  // transition: 'page',
  // transition: {
  //   name:  'fade',
  //   mode: 'out-in'
  // },
  serverMiddleware: [
    bodyParser.json(),
    '~/api'
  ],

  // serverMiddleware: [
  //   // Will register file from project api directory to handle /api/* requires
  //   { path: '/api', handler: '~/api/index.js' },
  // ],
  generate: {
    routes: function() {
      return axios.get('https://nuxt-blog-a3d84.firebaseio.com/posts.json')
        .then(res => {
          const routes = []
          for (const key in res.data){
            routes.push({
              route: '/posts/' + key,
              payload: {
                postData: res.data[key]
              }
            });
          }
          return routes
        })
    }
  }
}
