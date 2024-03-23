<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import AddBtn from './components/AddBtn.vue'
import CardList from './components/CardList.vue'
</script>

<template>
  <NavBar></NavBar>
  <AddBtn class="fixed bottom-0 right-0 m-4 z-20"></AddBtn>
  <div class="container px-8 mt-4 mx-auto">
    <div>
      <CardList v-for="i in 8" class="mt-4"></CardList>
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
