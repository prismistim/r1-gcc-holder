<script setup lang="ts">
import Card from './Card.vue'
</script>

<template>
  <div>
    <div class="text-xl font-bold">ららぽーと新三郷</div>
    <div class="mt-2 flex overflow-scroll gap-4 w-full py-4">
      <Card v-for="n in 8"></Card>
      <Card></Card>
    </div>
  </div>
</template>
