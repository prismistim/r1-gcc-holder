<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useStore } from '../composables/useStore'
import { themeChange } from 'theme-change'

const router = useRouter()
const store = useStore()

const isAgreeDelete = ref(false)

const goToIndexPage = () => {
  window.sessionStorage.clear()
  router.push('/')
}

const initData = () => {
  store.initStore()
  location.reload()
}

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
          <button @click="goToIndexPage">
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
        <li>
          <button :disabled="$route.name === 'Home'" onclick="delete_modal.showModal()">
            <span class="material-symbols-outlined">delete</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
  <dialog id="delete_modal" class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg">データの初期化</h3>
      <p class="mt-2">
        初期化を行うと、現在登録されているデータはすべて削除されます。よろしいですか？
      </p>
      <div class="form-control mt-6">
        <label class="cursor-pointer flex gap-x-2 ">
          <input
            v-model="isAgreeDelete"
            type="checkbox"
            class="checkbox checkbox-error"
          />
          <span class="label-text">問題ない</span>
        </label>
      </div>
      <div class="modal-action">
        <div class="grid grid-cols-2 gap-x-4">
          <form method="dialog">
            <button class="btn">キャンセル</button>
          </form>
          <button
            class="btn btn-error text-white"
            :disabled="!isAgreeDelete"
            @click="initData"
          >
            初期化
          </button>
        </div>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
