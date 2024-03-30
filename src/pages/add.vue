<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'
import { useStore } from '../composables/useStore'
import { QrcodeStream } from 'vue-qrcode-reader'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import type { QR } from '../types/qr'
import type { StoredDataItem } from '../types/storedData'
import { locations } from '../statics/location'

const router = useRouter()
const store = useStore()

const formData = ref<Omit<StoredDataItem, 'id'>>({
  codeValue: '',
  issueDate: '',
  locationId: 1,
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

const setFormData = () => {
  store.addItem(formData.value)
  router.push('/list')
}
</script>

<template>
  <div class="text-xl font-bold">カードを追加する</div>
  <div v-if="!formData.codeValue" class="mt-4">
    <QrcodeStream :formats="['qr_code']" @detect="onDetect"></QrcodeStream>
  </div>
  <div v-else class="mt-4">
    <div>
      <div>QRコード</div>
      <button class="btn btn-error w-full mt-2" @click="clearCodeValue">
        再読取り
      </button>
    </div>
    <div class="mt-4">
      <label>発行日</label>
      <div class="mt-2">
        <button class="btn" @click="formData.issueDate = today">今日</button>
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
        <option v-for="item in locations" :key="item.id" :value="item.id">
          {{ item.name }}
        </option>
      </select>
    </div>
    <div class="mt-6 text-center">
      <button class="btn btn-primary" @click="setFormData">追加</button>
    </div>
  </div>
</template>
