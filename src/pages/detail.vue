<script setup lang="ts">
import { ref, watch } from 'vue'
import VueQrcode from 'vue-qrcode'
import Card from '../components/Card.vue'

const isShowQRCode = ref(false)
const timeoutId = ref({
  qr: 0,
  progress: 0,
})
const progress = ref(0)

const maxShowTime = 10000

watch(isShowQRCode, () => {
  if (!isShowQRCode.value && timeoutId.value.qr == 0) return
  timeoutId.value.qr = window.setTimeout(switchQRCodeDisplay, maxShowTime)
})

const switchQRCodeDisplay = () => {
  if (isShowQRCode.value) {
    window.clearTimeout(timeoutId.value.qr)
    window.clearInterval(timeoutId.value.progress)

    timeoutId.value.progress = 0
    timeoutId.value.qr = 0

    progress.value = 0
  } else {
    startProgressBar()
  }

  isShowQRCode.value = !isShowQRCode.value
}

const startProgressBar = () => {
  timeoutId.value.progress = window.setInterval(() => {
    progress.value += 5
  }, 1)
}
</script>

<template>
  <Card show-location></Card>
  <div class="mt-4 p-7 bg-black rounded-md">
    <div class="h-48 flex items-center justify-center">
      <VueQrcode
        v-if="isShowQRCode"
        value="https://example.com/"
        :color="{
          dark: '#000000ff',
          light: '#ffffffff',
        }"
        type="image/png"
        :scale="6"
      ></VueQrcode>
      <button
        v-else
        class="h-full w-48 btn rounded-md bg-neutral-800"
        @click="switchQRCodeDisplay"
      >
        QRコードを表示
      </button>
    </div>
    <div class="flex items-center gap-2 justify-center mt-4">
      <progress
        class="progress progress-error w-56"
        :value="progress"
        :max="maxShowTime"
      ></progress>
      <button
        :disabled="!isShowQRCode"
        class="btn btn-square btn-sm"
        @click="switchQRCodeDisplay"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </div>
  <div class="mt-4">
    <div>カレンダーにリマインドを追加</div>
    <div class="flex flex-wrap gap-4 justify-center">
      <button class="btn mt-4">Googleカレンダー</button>
      <button class="btn mt-4">iCal</button>
    </div>
  </div>
  <div class="mt-4">
    <div>操作</div>
    <div class="flex flex-wrap gap-4 justify-center">
      <button class="btn btn-secondary mt-4">有効期限の更新（再チャージ）</button>
      <button class="btn btn-error mt-4">このカードを削除する</button>
    </div>
  </div>
</template>