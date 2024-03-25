<script setup lang="ts">
import { ref } from 'vue'
import { QR } from '../types/qr'
import { QrcodeStream } from 'vue-qrcode-reader'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { useRouter } from 'vue-router'

const router = useRouter()

const onDetect = async (item: QR[]) => {
  state.value = item[0].rawValue
}

const state = ref('')
</script>

<template>
  <div class="text-xl font-bold">カードを追加する</div>
  <div v-if="!state" class="mt-4">
    <QrcodeStream :formats="['qr_code']" @detect="onDetect"></QrcodeStream>
  </div>
  <form v-else class="mt-4">
    <div>
      <label>発行日</label>
      <VueDatePicker :enable-time-picker="false" class="mt-2"></VueDatePicker>
    </div>
    <div class="mt-4">
      <label>店舗</label>
      <select class="select w-full rounded-md mt-2">
        <option disabled>埼玉県</option>
        <option>ららぽーと新三郷</option>
        <option disabled>大阪府</option>
        <option>堺</option>
      </select>
    </div>
    <div class="mt-6 text-center">
      <button class="btn btn-primary rounded-md" @click="router.push('/')">追加</button>
    </div>
  </form>
</template>
