import { createApp } from 'vue'
import '@fontsource-variable/material-symbols-outlined'
import '@fontsource-variable/m-plus-2'
import '@fontsource-variable/rubik'
import './style.css'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
