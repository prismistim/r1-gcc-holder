<script setup lang="ts">
import { Location, locations } from '../statics/location'
import { useStore } from '../composables/useStore'
import Card from './Card.vue'
import dayjs from 'dayjs'

const store = useStore()

const cards = store.getStoredData()?.cards

const targetLocationCards = (locationId: Location['id']) => {
  return cards
    ?.filter((item) => item.locationId === locationId)
    .sort((a, b) => dayjs(a.issueDate).diff(b.issueDate, 'day'))
}
</script>

<template>
  <div v-for="location in locations" :key="location.id" class="mt-4">
    <template v-if="targetLocationCards(location.id)?.length !== 0">
      <div class="text-xl font-medium">{{ location.name }}</div>
      <div class="mt-2 flex overflow-scroll gap-4 w-full py-2">
        <Card
          v-for="item in targetLocationCards(location.id)"
          :key="item.id"
          :id="item.id"
          :issue-date="item.issueDate"
          :location-id="item.locationId"
        ></Card>
      </div>
    </template>
  </div>
  <div v-if="!cards || cards.length === 0">
    <div class="text-xl font-bold">カードが登録されていません</div>
    <p class="mt-2">右下の+ボタンを押して登録してください</p>
  </div>
</template>
