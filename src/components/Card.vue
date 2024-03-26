<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import dayjs from 'dayjs'
import type { StoredDataItem } from '../types/storedData'
import { locations } from '../statics/location'

type Props = {
  id: StoredDataItem['id']
  issueDate: StoredDataItem['issueDate']
  locationId: StoredDataItem['locationId']
  showLocation: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showLocation: false,
})

const remainDays = computed(() => {
  return dayjs(props.issueDate).add(180, 'day').diff(dayjs(), 'day')
})

const targetLocation = computed(() => {
  return locations.find((item) => item.id === props.locationId)
})
</script>

<template>
  <RouterLink
    :to="`/detail/${props.id}`"
    class="min-w-56 card bg-neutral-950 shadow-lg"
  >
    <figure class="h-24 bg-gradient-to-b from-error to-neutral-950"></figure>
    <div class="card-body">
      <div class="text-2xl font-bold">{{ remainDays }} day(s)</div>
      <div v-show="props.showLocation" class="font-bold">
        @ {{ targetLocation?.name }}
      </div>
      <div class="">{{ props.issueDate }}</div>
    </div>
  </RouterLink>
</template>
