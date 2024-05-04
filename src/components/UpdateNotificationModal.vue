<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { version } from '../config'
import { changeLog } from '@/statics/changeLog'

const modalElement = ref<HTMLDialogElement>()

const setCurrentVersion = () => {
  localStorage.setItem('version', version)
}

const getDescriptionByBeforeUpdatedDiff = () => {
  return changeLog.filter((item) => {
    const beforeVersion = localStorage
      .getItem('version')
      ?.split('.')
      .map((v) => parseInt(v))
    const targetVersion = item.version.split('.').map((v) => parseInt(v))

    if (!beforeVersion || beforeVersion.length === 0) {
      return
    }

    if (
      beforeVersion[1] === targetVersion[1] &&
      beforeVersion[2] < targetVersion[2]
    ) {
      return item
    } else if (beforeVersion[1] < targetVersion[1]) {
      return item
    }
  })
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
      <div class="p-3 bg-neutral-200 mt-2 rounded-md">
        <div class="space-y-3">
          <div
            v-for="item of getDescriptionByBeforeUpdatedDiff()"
            :key="item.version"
            class=""
          >
            <div class="text-lg font-semibold">{{ item.version }}</div>
            <div class="text-md font-semibold">{{ item.title }}</div>
            <p class="text-sm">{{ item.description }}</p>
          </div>
        </div>
      </div>
      <div class="modal-action">
        <form method="dialog">
          <button class="btn" @click="setCurrentVersion">Close</button>
        </form>
      </div>
    </div>
  </dialog>
</template>
