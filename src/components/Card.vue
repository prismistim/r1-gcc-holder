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
    class="min-w-56 card bg-white shadow-lg"
  >
    <figure
      :class="[
        'h-20',
        remainDays >= 0
          ? 'bg-gradient-to-b from-primary to-white'
          : 'bg-gradient-to-b from-neutral-500 to-white',
      ]"
    ></figure>
    <div class="card-body">
      <div class="text-4xl font-bold">
        <span v-if="remainDays === 0" class="text-red-500">Today</span>
        <span v-else-if="remainDays < 0">Expired...</span>
        <span v-else>
          {{ remainDays }}
          <span class="text-2xl"> day<span v-if="remainDays > 1">s</span> </span>
        </span>
      </div>
      <div v-show="props.showLocation" class="font-bold">
        @ {{ targetLocation?.name }}
      </div>
      <div class="">{{ props.issueDate }}</div>
    </div>
  </RouterLink>
</template>
