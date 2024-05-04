<script setup lang="ts">
import { computed } from 'vue'
import dayjs from 'dayjs'
import { useStore } from '../composables/useStore'
import { StoredDataItem } from '../types/storedData'
import { locations } from '../statics/location'

type Props = {
  id: StoredDataItem['id']
}

const props = withDefaults(defineProps<Props>(), {
  id: 0,
})

const store = useStore()

const targetItem = computed(() => {
  return store.getTargetItem(props.id)
})

const targetLocation = computed(() => {
  if (!targetItem.value) return
  return locations.find((item) => item.id === targetItem.value?.locationId)
})

const expiredDate = computed(() => {
  if (!targetItem.value) return
  else return dayjs(targetItem.value.issueDate).add(180, 'days').format('YYYYMMDD')
})
</script>

<template>
  <a
    v-if="props.id && targetItem && expiredDate"
    :href="`https://www.google.com/calendar/event?action=TEMPLATE&text=[${targetLocation?.name}] ゲームチャージカード有効期限日&dates=${expiredDate}}/${expiredDate}`"
    target="_blank"
    class="btn mt-4"
  >
    Googleカレンダー
  </a>
</template>
