<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import dayjs from 'dayjs'
import { useStore } from '../composables/useStore'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import BackBtn from '@/components/BackBtn.vue'

const router = useRouter()
const route = useRoute()
const store = useStore()

const formData = ref<{ issueDate: string }>({
  issueDate: '',
})

const setFormData = () => {
  if (!route.params.id || typeof route.params.id !== 'string') return

  store.changeItemIssueDate({
    id: parseInt(route.params.id),
    issueDate: dayjs(formData.value.issueDate).format('YYYY-MM-DD'),
  })
  router.push('/list')
}

const today = computed(() => {
  return dayjs().format('YYYY-MM-DD')
})

if (!route.params.id || typeof route.params.id !== 'string') {
  router.push({ name: 'List' })
}

onMounted(() => {
  formData.value.issueDate = today.value
})
</script>

<template>
  <BackBtn></BackBtn>
  <div class="mt-2 text-xl font-bold">有効期限を更新する（再チャージ）</div>
  <div class="mt-4">
    <div class="mt-4">
      <label>再チャージ日</label>
      <div class="mt-2">
        <VueDatePicker
          v-model="formData.issueDate"
          :enable-time-picker="false"
          format="yyyy-MM-dd"
          auto-apply
          :min-date="store.getTargetItem(parseInt(route.params.id as string))?.issueDate"
          :max-date="new Date()"
          input-class-name="dp-issue-date"
          class="mt-2"
        ></VueDatePicker>
        <button class="btn mt-2" @click="formData.issueDate = today">
          今日
        </button>
      </div>
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
