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
    :class="[$route.path === '/list' ? 'max-w-56' : '', 'min-w-56 card bg-gradient-to-bl from-red-400 to-primary shadow-md text-white']"
  >
    <figure
      v-if="$route.path === '/list'"
      :class="[
        'h-20',
        remainDays >= 0 ? '' : 'bg-gradient-to-b from-neutral-500 to-white',
      ]"
    ></figure>
    <slot v-else></slot>
    <div class="card-body">
      <div class="text-4xl font-medium">
        <span v-if="remainDays === 0" class="text-red-500">Today</span>
        <span v-else-if="remainDays < 0">Expired...</span>
        <span v-else class="flex flex-wrap items-end gap-x-1 gap-y-2">
          {{ remainDays }}
          <span class="text-2xl"> day<span v-if="remainDays > 1">s</span></span>
          <progress class="progress progress-secondary w-full" :value="remainDays" :max="180"></progress>
        </span>
      </div>
      <div class="">
        {{ dayjs().add(remainDays, 'day').format('YYYY-MM-DD') }}
      </div>
      <div v-show="props.showLocation" class="flex flex-wrap gap-x-2">
        <span> @ {{ targetLocation?.name }} </span>
        <span>( {{ props.issueDate }} )</span>
      </div>
    </div>
  </RouterLink>
</template>
