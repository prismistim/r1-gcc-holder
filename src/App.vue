<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { useStore } from './composables/useStore'
import NavBar from './components/NavBar.vue'
import MyFooter from './components/MyFooter.vue'
import UpdateNotificationModal from './components/UpdateNotificationModal.vue'

const { needRefresh, updateServiceWorker } = useRegisterSW()
const store = useStore()
const patchStatus = localStorage.getItem('patch_status')

if (needRefresh) {
  updateServiceWorker(true)
}

const updateStoredData = () => {
  // カードのオブジェクト構造のアップデート
  const storedData = store.getStoredData()

  if (!storedData) {
    return
  }

  // ダミーデータ用のプロパティの追加
  if (!patchStatus || parseInt(patchStatus) < 1) {
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
