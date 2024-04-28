<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import ReloadToast from './components/ReloadToast.vue'
</script>

<template>
  <NavBar></NavBar>
  <div class="container px-8 my-4 mx-auto">
    <RouterView></RouterView>
  </div>
  <ReloadToast></ReloadToast>
</template>
