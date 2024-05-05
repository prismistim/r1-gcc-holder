<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { version } from '../config'
import { changeLog } from '@/statics/changeLog'

const modalElement = ref<HTMLDialogElement>()

const setCurrentVersion = () => {
  localStorage.setItem('version', version)
}

const getDescriptionByBeforeUpdatedDiff = computed(() => {
  return changeLog.filter((item) => {
    const beforeVersionStr = localStorage.getItem('version')

    if (!beforeVersionStr) {
      return
    }

    const splittedStr = beforeVersionStr.split('.')

    if (splittedStr.length !== 3) {
      return
    }

    const [beforeMajorVersion, beforeMinorVersion, beforePatchVersion] =
      splittedStr.map((v) => parseInt(v))
    const [targetMajorVersion, targetMinorVersion, targetPatchVersion] =
      item.version.split('.').map((v) => parseInt(v))

    // メジャーアップデート
    if (targetMajorVersion > beforeMajorVersion) {
      return item
    }

    // マイナーアップデート
    if (
      targetMajorVersion === beforeMajorVersion &&
      targetMinorVersion > beforeMinorVersion
    ) {
      return item
    }

    // パッチアップデート
    if (
      targetMajorVersion === beforeMajorVersion &&
      targetMinorVersion === beforeMinorVersion &&
      targetPatchVersion > beforePatchVersion
    ) {
      return item
    }
  })
})

onMounted(() => {
  // バージョンが更新された際にモーダルを表示
  if (
    localStorage.getItem('version') !== version ||
    getDescriptionByBeforeUpdatedDiff.value.length > 0
  ) {
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
      <div
        class="p-3 bg-neutral-200 mt-2 rounded-md max-h-[350px] overflow-scroll"
      >
        <div class="space-y-3">
          <div
            v-for="item of getDescriptionByBeforeUpdatedDiff"
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
          <button class="btn" @click="setCurrentVersion">閉じる</button>
        </form>
      </div>
    </div>
  </dialog>
</template>
