<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'
import { useStore } from '../composables/useStore'
import { QrcodeStream } from 'vue-qrcode-reader'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import type { QR } from '../types/qr'
import type { StoredDataItem } from '../types/storedData'
import { locations } from '../statics/location'
import BackBtn from '../components/BackBtn.vue'

const router = useRouter()
const store = useStore()
const error = ref('')

const MODE = import.meta.env.MODE

const formData = ref<Omit<StoredDataItem, 'id'>>({
  codeValue: '',
  issueDate: '',
  locationId: 1,
})

const onDetect = async (item: QR[]) => {
  formData.value.codeValue = item[0].rawValue
}

const onError = (err: DOMException) => {
  error.value = `[${err.name}] `

  if (err.name === 'NotAllowedError') {
    error.value += 'QRコードをスキャンするにはカメラの使用を許可してください。'
  } else if (err.name === 'NotFoundError') {
    error.value += '使用できるカメラが見つかりません。'
  } else if (err.name === 'NotReadableError') {
    error.value += 'このカメラは他のアプリケーションで使用されています。'
  } else {
    error.value += '不明なエラーです。'
  }
}

const clearCodeValue = () => {
  formData.value.codeValue = ''
}

const today = computed(() => {
  return dayjs().format('YYYY-MM-DD')
})

const setFormData = () => {
  store.addItem({
    ...formData.value,
    issueDate: dayjs(formData.value.issueDate).format('YYYY-MM-DD'),
  })
  router.push('/list')
}

const reload = () => {
  window.location.reload()
}

onMounted(() => {
  formData.value.issueDate = today.value
})
</script>

<template>
  <BackBtn></BackBtn>
  <div class="mt-2 text-xl font-bold">カードを追加する</div>
  <div v-if="!formData.codeValue" class="mt-4">
    <div v-if="error">
      <p>
        {{ error }}
      </p>
      <button class="btn btn-success mt-2" @click="reload">リロード</button>
    </div>
    <QrcodeStream
      v-else
      :formats="['qr_code']"
      @detect="onDetect"
      @error="onError"
    ></QrcodeStream>
    <button
      v-if="MODE !== 'production' && $route.query.mode === 'dev'"
      class="btn"
      @click="formData.codeValue = 'hogehoge'"
    >
      ダミーデータ挿入
    </button>
  </div>
  <div v-else class="mt-4">
    <div>
      <div>QRコード</div>
      <button class="btn w-full mt-2" @click="clearCodeValue">再読取り</button>
    </div>
    <div class="mt-4">
      <label>発行日</label>
      <div class="mt-2">
        <VueDatePicker
          v-model="formData.issueDate"
          :enable-time-picker="false"
          format="yyyy-MM-dd"
          auto-apply
          :max-date="new Date()"
          input-class-name="dp-issue-date"
        ></VueDatePicker>
        <button class="btn mt-2" @click="formData.issueDate = today">今日</button>
      </div>
    </div>
    <div class="mt-4">
      <label>店舗</label>
      <select
        v-model="formData.locationId"
        class="select select-bordered bg-white w-full rounded-md mt-2"
      >
        <option v-for="item in locations" :key="item.id" :value="item.id">
          {{ item.name }}
        </option>
      </select>
    </div>
    <div class="mt-6 text-center">
      <button class="btn w-48 btn-primary text-white" @click="setFormData">
        追加
      </button>
    </div>
  </div>
</template>

<style>
.dp-issue-date {
  padding-top: 0;
  padding-bottom: 0;
  height: 3rem;
  min-height: 3rem;
}
</style>
