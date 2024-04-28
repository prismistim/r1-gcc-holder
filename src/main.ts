import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import '@fontsource-variable/material-symbols-outlined'
import '@fontsource-variable/m-plus-2'
import '@fontsource-variable/rubik'
import './style.css'
import App from './App.vue'
import router from './router'

const head = createHead()

createApp(App).use(head).use(router).mount('#app')
