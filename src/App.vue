<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import NavBar from './components/NavBar.vue'
import MyFooter from './components/MyFooter.vue'
import UpdateNotificationModal from './components/UpdateNotificationModal.vue'

const { needRefresh, updateServiceWorker } = useRegisterSW()

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
