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
  showLocation: false
})

const remainDays = computed(() => {
  return dayjs(props.issueDate).add(181, 'day').diff(dayjs(), 'day')
})

const targetLocation = computed(() => {
  return locations.find((item) => item.id === props.locationId)
})
</script>

<template>
  <RouterLink
    :to="`/detail/${props.id}`"
    :class="[
      'min-w-56 w-full card bg-gradient-to-bl ring-1/2 ring-white shadow-md text-white',
      !$route.path.startsWith('/detail') ? 'sm:w-56' : '',
      remainDays === 0
        ? 'from-red-300 to-primary'
        : remainDays > 0
          ? 'from-red-400 to-primary'
          : 'from-neutral-400 to-neutral-600'
    ]"
  >
    <figure v-if="$route.path === '/list'" class="hidden md:block md:h-6"></figure>
    <slot></slot>
    <div class="card-body">
      <div class="text-2xl md:text-4xl font-medium">
        <span class="flex flex-wrap items-end gap-x-1 gap-y-2">
          <span v-if="remainDays === 0" class="text-white">Today</span>
          <span v-else-if="remainDays < 0">Expired</span>
          <span v-else>
            <span class="text-3xl md:text-4xl">
              {{ remainDays }}
            </span>
            <span class="text-lg md:text-2xl">
              day<span v-if="remainDays > 1">s</span></span
            >
          </span>
          <progress
            class="progress progress-secondary w-full"
            :value="remainDays"
            :max="180"
          ></progress>
        </span>
      </div>
      <div>
        {{ dayjs().add(remainDays, 'day').format('YYYY-MM-DD') }}
        <div v-show="$route.path.startsWith('/detail')" class="badge badge-outline ml-2">ダミーデータ</div>
      </div>
      <div v-show="props.showLocation" class="flex flex-wrap gap-x-2">
        <span> @ {{ targetLocation?.name }} </span>
        <span>( {{ props.issueDate }} )</span>
      </div>
    </div>
  </RouterLink>
</template>
