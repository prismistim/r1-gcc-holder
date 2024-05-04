<script setup lang="ts">
import { changeLog } from '@/statics/changeLog'
import BackBtn from '@/components/BackBtn.vue'
</script>

<template>
  <BackBtn></BackBtn>
  <div>
    <div class="mt-4 mx-auto lg:px-24 max-w-[960px]">
      <h1 class="mt-2 text-xl font-bold">リリース履歴</h1>
      <div class="space-y-4 mt-2">
        <div v-for="item in changeLog" :key="item.version" class="">
          <div class="text-xl font-semibold">{{ item.version }}</div>
          <div class="text-lg font-semibold">{{ item.title }}</div>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
