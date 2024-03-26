<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'
import { QrcodeStream } from 'vue-qrcode-reader'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import type { QR } from '../types/qr'

const router = useRouter()

const formData = ref({
  codeValue: '',
  issueDate: '',
  locationId: '',
})

const onDetect = async (item: QR[]) => {
  formData.value.codeValue = item[0].rawValue
}

const clearCodeValue = () => {
  formData.value.codeValue = ''
}

const today = computed(() => {
  return dayjs().format('YYYY-MM-DD')
})
</script>

<template>
  <div class="text-xl font-bold">カードを追加する</div>
  <div v-if="!formData.codeValue" class="mt-4">
    <QrcodeStream :formats="['qr_code']" @detect="onDetect"></QrcodeStream>
  </div>
  <div v-else class="mt-4">
    <div>
      <div>QRコード</div>
      <button class="btn btn-error rounded-md mt-2" @click="clearCodeValue">
        再読取り
      </button>
    </div>
    <div class="mt-4">
      <label>発行日</label>
      <div class="mt-2">
        <button class="btn rounded-md" @click="formData.issueDate = today">
          今日
        </button>
        <VueDatePicker
          v-model="formData.issueDate"
          :enable-time-picker="false"
          format="yyyy-MM-dd"
          dark
          auto-apply
          :max-date="new Date()"
          class="mt-2"
        ></VueDatePicker>
      </div>
    </div>
    <div class="mt-4">
      <label>店舗</label>
      <select
        v-model="formData.locationId"
        class="select select-bordered w-full rounded-md mt-2"
      >
        <option disabled>埼玉県</option>
        <option value="saitama_lala_sinmisato">ららぽーと新三郷</option>
        <option disabled>大阪府</option>
        <option value="osaka_sakai">堺</option>
      </select>
    </div>
    <div class="mt-6 text-center">
      <button class="btn btn-primary rounded-md" @click="router.push('/list')">
        追加
      </button>
    </div>
  </div>
</template>
