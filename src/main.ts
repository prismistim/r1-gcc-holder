import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import { createPlausible } from 'v-plausible/vue'
import '@fontsource-variable/material-symbols-outlined'
import '@fontsource-variable/m-plus-2'
import '@fontsource-variable/rubik'
import './style.css'
import App from './App.vue'
import router from './router'

const plausible = createPlausible({
  init: {
    domain: 'https://gcch.asayake.dev/',
    apiHost: 'https://tracker.snowsphere.net',
    trackLocalhost: false
  },
  settings: {
    enableAutoOutboundTracking: true,
    enableAutoPageviews: true
  },
  partytown: false
})

const head = createHead()

createApp(App).use(head).use(router).use(plausible).mount('#app')
