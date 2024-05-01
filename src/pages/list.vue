<script setup lang="ts">
import { useRouter } from 'vue-router'
import AddBtn from '../components/AddBtn.vue'
import CardList from '../components/CardList.vue'

const router = useRouter()
</script>

<template>
  <div class="flex flex-wrap gap-y-4">
    <CardList></CardList>
  </div>
  <AddBtn
    class="fixed bottom-0 right-0 m-4 z-20"
    @click="router.push('/add')"
  ></AddBtn>
</template>
