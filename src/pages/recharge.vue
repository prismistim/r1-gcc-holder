<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import dayjs from 'dayjs'
import { useStore } from '../composables/useStore'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const router = useRouter()
const route = useRoute()
const store = useStore()

const formData = ref<{ issueDate: Date }>({
  issueDate: new Date(),
})

const setFormData = () => {
  if (!route.params.id || typeof route.params.id !== 'string') return

  store.changeItemIssueDate({
    id: parseInt(route.params.id),
    issueDate: dayjs(formData.value.issueDate).format('YYYY-MM-DD'),
  })
  router.push('/list')
}

if (!route.params.id || typeof route.params.id !== 'string') {
  router.push({ name: 'List' })
}
</script>

<template>
  <div class="text-xl font-bold">有効期限を更新する（再チャージ）</div>
  <div class="mt-4">
    <div class="mt-4">
      <label>再チャージ日</label>
      <div class="mt-2">
        <button class="btn" @click="formData.issueDate = new Date()">
          今日
        </button>
        <VueDatePicker
          v-model="formData.issueDate"
          :enable-time-picker="false"
          format="yyyy-MM-dd"
          dark
          auto-apply
          :min-date="store.getTargetItem(parseInt(route.params.id as string))?.issueDate"
          :max-date="new Date()"
          class="mt-2"
        ></VueDatePicker>
      </div>
    </div>
    <div class="mt-6 text-center">
      <button class="btn btn-primary" @click="setFormData">更新</button>
    </div>
  </div>
</template>
