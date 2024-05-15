<script setup lang="ts">
import { Location, locations } from '../statics/location'
import { useStore } from '../composables/useStore'
import Card from './Card.vue'
import dayjs from 'dayjs'
import { StoredDataItem } from '../types/storedData'

const store = useStore()

const cards = store.getStoredData()?.cards

const targetLocationCards = (locationId: Location['id']) => {
  const targets = cards?.filter((item) => item.locationId === locationId)

  const activeTargets =
    targets?.filter(
      (item) => dayjs(dayjs()).diff(item.issueDate, 'day') < 180
    ) ?? []
  const inActiveTargets =
    targets?.filter(
      (item) => dayjs(dayjs()).diff(item.issueDate, 'day') > 180
    ) ?? []

  const sortFn = (a: StoredDataItem, b: StoredDataItem) =>
    dayjs(a.issueDate).diff(b.issueDate, 'day')

  activeTargets?.sort(sortFn)
  inActiveTargets?.sort(sortFn)

  return activeTargets.concat(inActiveTargets)
}
</script>

<template>
  <div class="w-full space-y-2">
    <div v-for="location in locations" :key="location.id">
      <template v-if="targetLocationCards(location.id)?.length !== 0">
        <div class="w-full">
          <div class="text-lg md:text-xl font-medium py-1">
            {{ location.name }}
          </div>
          <div
            :class="'flex flex-wrap sm:flex-nowrap overflow-scroll gap-4 w-full py-2'"
          >
            <Card
              v-for="item in targetLocationCards(location.id)"
              :key="item.id"
              :id="item.id"
              :issue-date="item.issueDate"
              :location-id="item.locationId"
              :is-dummy="item.isDummy"
              :show-location="false"
            ></Card>
          </div>
        </div>
      </template>
    </div>
    <div v-if="!cards || cards.length === 0">
      <div class="text-xl font-bold">カードが登録されていません</div>
      <p class="mt-2">右下の+ボタンを押して登録してください</p>
    </div>
  </div>
</template>
