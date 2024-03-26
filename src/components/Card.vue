<script setup lang="ts">
import { RouterLink } from 'vue-router'

type Props = {
  showLocation: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showLocation: false
})
</script>

<template>
  <RouterLink
    :to="`/detail/${1}`"
    class="min-w-56 card bg-neutral-950 shadow-lg"
  >
    <figure class="h-24 bg-gradient-to-b from-error to-neutral-950"></figure>
    <div class="card-body">
      <div class="text-2xl font-bold">999 days</div>
      <div v-show="props.showLocation" class="font-bold">@ららぽーと新三郷</div>
      <div class="">2024-01-01</div>
    </div>
  </RouterLink>
</template>
