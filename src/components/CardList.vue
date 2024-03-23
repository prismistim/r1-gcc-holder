<script setup lang="ts">
import Card from './Card.vue'
</script>

<template>
  <div>
    <div class="text-xl font-bold">ららぽーと新三郷店</div>
    <div class="mt-4 flex overflow-scroll gap-4 w-full">
      <Card v-for="n in 8"></Card>
      <Card></Card>
    </div>
  </div>
</template>w-full