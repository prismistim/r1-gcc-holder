<script setup lang="ts">
import dayjs from 'dayjs'
</script>

<template>
  <footer class="text-center border-t mt-6 p-6 text-neutral-500">
    ©{{ dayjs().format('YYYY') }}&nbsp;
    <a href="https://portal.snowsphere.net/" target="_blank">snowsphere</a>
  </footer>
</template>
