<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue'

const { offlineReady } = useRegisterSW()
</script>

<template>
  <div class="toast" v-if="offlineReady">
    <div class="alert alert-info">
      <span>Offline Ready</span>
    </div>
  </div>
</template>
