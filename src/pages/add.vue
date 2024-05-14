<script setup lang="ts">
import { ref, computed, onMounted, watchEffect } from 'vue'
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
const isShowCodeValue = ref(false)

const MODE = import.meta.env.MODE

const scanError = ref({
  code: '',
  message: ''
})

const formData = ref<Omit<StoredDataItem, 'id'>>({
  codeValue: '',
  issueDate: '',
  locationId: 1,
  isDummy: false
})

const onDetect = async (item: QR[]) => {
  if (!/^\d{16}$/.test(item[0].rawValue)) {
    console.log(item[0].rawValue)
    return
  }

  if (store.getTargetItemByCode(item[0].rawValue)) {
    scanError.value.code = 'IsAlreadyAdded'
    return
  }

  formData.value.codeValue = item[0].rawValue
  formData.value.isDummy = false
}

const onError = (err: DOMException) => {
  scanError.value.code = err.name

  if (err.name === 'NotAllowedError') {
    scanError.value.message +=
      'QRコードをスキャンするにはカメラの使用を許可してください。'
  } else if (err.name === 'NotFoundError') {
    scanError.value.message += '使用できるカメラが見つかりません。'
  } else if (err.name === 'NotReadableError') {
    scanError.value.message +=
      'このカメラは他のアプリケーションで使用されています。'
  } else {
    scanError.value.message += '不明なエラーです。'
  }
}

const setDummyCode = () => {
  let result = ''
  const sourceChar = '0123456789'

  for(let i = 0; i < 16; i++) {
    result += sourceChar[Math.floor(Math.random() * sourceChar.length)]
  }

  formData.value.codeValue = 'd_' + result
  formData.value.isDummy = true
}

const clearCodeValue = () => {
  formData.value.codeValue = ''
  clearErrorStatus()
}

const clearErrorStatus = () => {
  scanError.value.code = ''
  scanError.value.message = ''
}

const today = computed(() => {
  return dayjs().format('YYYY-MM-DD')
})

const setFormData = () => {
  if (store.getTargetItemByCode(formData.value.codeValue)) {
    scanError.value.code = 'IsAlreadyAdded'
    scanError.value.message = 'このカードはすでに登録されています。'
    return
  }

  store.addItem({
    ...formData.value,
    issueDate: dayjs(formData.value.issueDate).format('YYYY-MM-DD')
  })
  router.push('/list')
}

const reload = () => {
  window.location.reload()
}

onMounted(() => {
  formData.value.issueDate = today.value
})

watchEffect(() => {
  if (isShowCodeValue.value) {
    setTimeout(() => (isShowCodeValue.value = false), 3000)
  }
})
</script>

<template>
  <BackBtn></BackBtn>
  <div class="mt-4 text-xl font-bold">カードを追加する</div>
  <div v-if="scanError.code" class="mt-2 p-4 rounded-md bg-error text-white">
    <p>{{ scanError.message }}</p>
    <button
      v-if="scanError.code !== 'IsAlreadyAdded'"
      class="btn btn-secondary mt-2"
      @click="reload"
    >
      リロード
    </button>
  </div>
  <div v-if="!formData.codeValue" class="mt-4">
    <QrcodeStream
      v-if="!scanError.code"
      :formats="['qr_code']"
      @detect="onDetect"
      @error="onError"
    ></QrcodeStream>
    <button class="btn mt-2" @click="setDummyCode()">
      (お試し) ダミーデータ挿入
    </button>
  </div>
  <div v-else class="mt-4">
    <div>
      <div>QRコード<div v-show="formData.isDummy" class="ml-2 badge badge-outline badge-primary">ダミーデータ</div></div>
      <label class="input input-bordered flex items-center mt-2 gap-2 bg-white">
        <input
          :value="formData.codeValue"
          :type="isShowCodeValue ? 'text' : 'password'"
          class="grow"
          readonly
          @click="isShowCodeValue = true"
        />
      </label>
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
        <button class="btn mt-2" @click="formData.issueDate = today">
          今日
        </button>
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
