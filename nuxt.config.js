// import { pwa } from './config/pwa'
import {
  appDescription,
  appkeywords
} from './constants/index'
import axios from "axios";
// import legacy from '@vitejs/plugin-legacy';

//console.log(process.env) index_show=1&
const getRoutes = async () => {
  let all = [];
  let res = await axios.get(`https://ztgamecom.web.ztgame.com/api/news/list?site=ztgamecom&type=news&page=1&per_page=10000`);
  let list = res.data.data.list;
  for (let i = 0; i < list.length; i++) {
    all.push('/news/' + list[i].id);
    all.push('/m/news/' + list[i].id);
  }
  return all
}
export default defineNuxtConfig({
  // router: {
  //   trailingSlash: true,
  // },
  // router: {
  //   extendRoutes(routes) {
  //     routes.forEach((route) => {
  //       // When options.generate.subFolders is true (default)
  //       const alias = route.path.length > 1 ? `${route.path}/index.html` : '/index.html';
  //       // When options.generate.subFolders is false
  //       // const normalizedRoute = route.path.replace(/\/$/, '') // Remove trailing slashes if they exist
  //       // const alias =
  //       //   route.path.length > 1 ? `${normalizedRoute}.html` : '/index.html'
  //       route.alias = alias
  //     })
  //   }
  // },
  nitro: {
    //对指定动态路由做预渲染
    // prerender: {
    //   routes: ['/news/1420', '/news/1416']
    // }
  },
  hooks: {
    async 'nitro:config'(nitroConfig) {
      if (nitroConfig.dev) {
        return
      }
      //对异步指定动态路由做预渲染
      let slugs = await getRoutes();
      console.log('开始');
      console.log(slugs);
      nitroConfig.prerender.routes.push(...slugs)
      return
    }
  },
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    'nuxt-module-eslint-config',
    'nuxt-vite-legacy',
  ],
  legacy: {
    targets: ["chrome 49"],
    additionalLegacyPolyfills: [
      "mdn-polyfills/Element.prototype.getAttributeNames",
    ],
    modernPolyfills: [
      'es.global-this',
      'es/object',
      'es/array',
      'es.symbol',
      'es.array.filter',
      'es.promise',
      'es.promise.finally',
      'es/map',
      'es/set',
      'es.array.from',
      'es.array.for-each',
      'es.object.define-properties',
      'es.object.define-property',
      'es.object.get-own-property-descriptor',
      'es.object.get-own-property-descriptors',
      'es.object.keys',
      'es.object.to-string',
      'web.dom-collections.for-each',
      'esnext.global-this',
      'esnext.string.match-all',
      'es.object.define-setter',
      'es.array.iterator',
      'es.object.assign',
      'es.array.includes'
    ],
  },
  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    renderJsonPayloads: true,
    typedPages: true,
  },
  css: [
    '@unocss/reset/tailwind.css',
    '/public/css/swiper-bundle.css',
    '/public/css/style.css',
  ],

  colorMode: {
    classSuffix: '',
  },

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      script: [{
        type: 'text/javascript',
        src: '/js/rem.js'
      }],
      link: [{
          rel: 'icon',
          href: '/favicon.ico',
          sizes: 'any'
        },
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/nuxt.svg'
        },
        {
          rel: 'apple-touch-icon',
          href: '/apple-touch-icon.png'
        },
        // {
        //   rel: 'stylesheet',
        //   type: 'text/css',
        //   href: 'https://unpkg.com/swiper@8/swiper-bundle.css'
        // }
      ],
      meta: [{
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        },
        {
          name: 'description',
          content: appDescription
        },
        {
          name: 'keywords',
          content: appkeywords
        },
        {
          name: 'apple-mobile-web-app-status-bar-style',
          content: 'black-translucent'
        },
      ],
    },
  },

  devtools: {
    enabled: true,
  },

  features: {
    // For UnoCSS
    inlineStyles: false,
  },

  eslintConfig: {
    setup: false,
  },
})