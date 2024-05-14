<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import NavBar from './components/NavBar.vue'
import MyFooter from './components/MyFooter.vue'
import UpdateNotificationModal from './components/UpdateNotificationModal.vue'
import { useStore } from './composables/useStore'
import { onMounted } from 'vue'

const { needRefresh, updateServiceWorker } = useRegisterSW()
const store = useStore()
const patchStatus = localStorage.getItem('patch_status')

if (needRefresh) {
  updateServiceWorker(true)
}

const updateStoredData = () => {
  // カードのオブジェクト構造のアップデート
  if (!patchStatus || parseInt(patchStatus) < 1) {
    const storedData = store.getStoredData()
  
    if (!storedData) {
      return
    } 
  
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
}

onMounted(() => {
  updateStoredData()
})
</script>

<template>
  <UpdateNotificationModal></UpdateNotificationModal>
  <NavBar></NavBar>
  <div class="container px-8 my-4 mx-auto">
    <RouterView></RouterView>
  </div>
  <MyFooter></MyFooter>
</template>
