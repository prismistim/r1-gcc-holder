<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { RouterView } from 'vue-router'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import NavBar from './components/NavBar.vue'
import MyFooter from './components/MyFooter.vue'
import UpdateNotificationModal from './components/UpdateNotificationModal.vue'

const { needRefresh, updateServiceWorker } = useRegisterSW()

useHead({
  title: 'r1-gcc-holder',
  meta: [
    {
      name: 'twitter:card',
      content: 'summary',
    },
    {
      name: 'twitter:site',
      content: '@prismist_m',
    },
    {
      name: 'twitter:creator',
      content: '@prismist_m',
    },
    {
      name: 'og:url',
      content: 'https://gcch.asayake.dev/',
    },
    {
      name: 'og:title',
      content: 'r1-gcc-holder',
    },
    {
      name: 'og:description',
      content: 'Game Charge Card Holder for R1',
    },
    {
      name: 'og:image',
      content: 'https://gcch.asayake.dev/pwa-512x512.png',
    },
  ],
})

if (needRefresh) {
  updateServiceWorker(true)
}
</script>

<template>
  <UpdateNotificationModal></UpdateNotificationModal>
  <NavBar></NavBar>
  <div class="container px-8 my-4 mx-auto">
    <RouterView></RouterView>
  </div>
  <MyFooter></MyFooter>
</template>
