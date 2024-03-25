<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import AddBtn from './components/AddBtn.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <NavBar></NavBar>
  <!-- <AddBtn class="fixed bottom-0 right-0 m-4 z-20" @click="router.push('/add')"></AddBtn> -->
  <div class="container px-8 my-4 mx-auto">
    <RouterView></RouterView>
  </div>
</template>
