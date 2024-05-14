<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import NavBar from './components/NavBar.vue'
import MyFooter from './components/MyFooter.vue'
import UpdateNotificationModal from './components/UpdateNotificationModal.vue'
import { useStore } from './composables/useStore'

const { needRefresh, updateServiceWorker } = useRegisterSW()
const store = useStore()

if (needRefresh) {
  updateServiceWorker(true)
}

const patchStatus = localStorage.getItem('patch_status')

// カードのオブジェクト構造のアップデート
if (!patchStatus || parseInt(patchStatus) < 1) {
  const storedData = store.getStoredData()

  const updatedData = storedData?.cards.map((item) => {
    return {
      ...item,
      isDummy: false
    }
  })

  store.initStore()

  updatedData?.forEach((item) => {
    store.addItem(item)
  })
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
