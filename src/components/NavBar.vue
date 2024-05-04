<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { themeChange } from 'theme-change'

onMounted(() => {
  themeChange(false)
})
</script>

<template>
  <div
    class="navbar z-10 top-0 sticky border-b-2 border-rose-500 bg-base-100 flex flex-wrap between"
  >
    <div class="flex-1">
      <RouterLink to="/" class="btn btn-ghost rounded-md text-lg flex gap-x-4">
        <img src="/logo.svg" class="w-5" />
      </RouterLink>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal rounded-box gap-x-2 text-rose-500">
        <li>
          <button :disabled="$route.name === 'List'" @click="$router.push('/list')">
            <span class="material-symbols-outlined">home</span>
          </button>
        </li>
        <li>
          <button @click="$router.push('/')">
            <span class="material-symbols-outlined">info</span>
          </button>
        </li>
        <!-- <li>
          <label class="swap swap-rotate">
            <input type="checkbox" data-toggle-theme="gcch_light,black" value="black"/>
            <span class="material-symbols-outlined swap-off">light_mode</span>
            <span class="material-symbols-outlined swap-on">dark_mode</span>
          </label>
        </li> -->
      </ul>
    </div>
  </div>
</template>
