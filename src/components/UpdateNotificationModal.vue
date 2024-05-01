<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { version } from '../config'

const modalElement = ref<HTMLDialogElement>()

const setCurrentVersion = () => {
  localStorage.setItem('version', version)
}

onMounted(() => {
  // バージョンが更新された際にモーダルを表示し、内部の
  if (localStorage.getItem('version') !== version) {
    modalElement.value?.showModal()
  }
})
</script>

<template>
  <dialog ref="modalElement" class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg">更新しました</h3>
      <p class="py-4">最新バージョンに更新しました</p>
      <code>{{ version }}</code>
      <div class="modal-action">
        <form method="dialog">
          <button class="btn" @click="setCurrentVersion">Close</button>
        </form>
      </div>
    </div>
  </dialog>
</template>
