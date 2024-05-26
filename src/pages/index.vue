<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/composables/useStore'
import { useSession } from '@/composables/useSession'
import { version } from '../config'

const router = useRouter()
const store = useStore()
const session = useSession()
const isAgreeDelete = ref(false)

const onConfirm = () => {
  session.setConfirmNoticeStatus()
  router.push('/list')
}

const initData = () => {
  localStorage.clear()
  sessionStorage.clear()
  location.reload()
}

onMounted(() => {
  if (!store.getStoredData()) {
    store.initStore()
  }
})
</script>

<template>
  <div class="my-4 py-4 flex flex-wrap justify-center">
    <img src="/logo.svg" class="w-32" />
  </div>
  <div class="text-3xl font-bold text-center">r1-gcc-holder</div>
  <div class="text-center mt-4">
    <div class="badge badge-neutral badge-lg">{{ version }}</div>
  </div>
  <div class="mt-4 text-center">
    <div>
      <a
        href="https://github.com/prismistim/r1-gcc-holder"
        target="_blank"
        class="text-lg inline-flex justify-center items-center py-1/2 text-primary font-semibold hover:opacity-50 transition-opacity duration-300 hover:cursor-pointer"
      >
        <span class="mr-1 material-symbols-outlined">
          <span class="text-sm font-semibold flex items-center">
            open_in_new
          </span>
        </span>
        GitHub
      </a>
    </div>
    <div>
      <RouterLink
        to="/changelog"
        class="text-lg inline-flex justify-center items-center py-1/2 text-primary font-semibold hover:opacity-50 transition-opacity duration-300 hover:cursor-pointer"
      >
        リリース履歴
      </RouterLink>
    </div>
  </div>
  <div class="mx-auto mt-8 lg:px-24 max-w-[960px]">
    <div class="text-md md:text-lg font-bold mt-4">このアプリは何？</div>
    <ul class="text-sm md:text-md list-disc list-inside mt-2">
      <li>
        某アミューズメント施設のプリペイドカードの保存、表示が可能なアプリ
      </li>
      <li>カードに記されたQRコードと同じデータが読み取り可能なコードを表示</li>
      <li>有効期限をカレンダーにリマインドとして追加可能</li>
      <li>
        PWAとしてインストール、オフラインで動作可能（ここで登録したデータはすべて端末上で管理します）
      </li>
    </ul>
    <div class="text-md md:text-lg font-bold mt-4">注意事項</div>
    <ul class="list-disc list-inside mt-2 text-sm md:text-md">
      <li>
        本アプリは元サービスの運営会社側の許諾を得て開発したものではありません。カードに関するシステムの権利等は運営会社に帰属します。
      </li>
      <li>
        本アプリに関する内容に関して、元サービスの運営会社へのお問い合わせはご遠慮ください。
      </li>
      <li>
        完全な動作の保証はできかねます。本アプリ利用時も発行したカードは必ず保管、携帯し自己責任で利用してください。
      </li>
      <li class="text-primary font-semibold">
        システムの仕様がまだ十分に調査できていないため、有効期限の設定などが1日程度異なる可能性があります。また、特殊な仕様が存在する可能性があるため、本アプリを試す場合は残高が0円、もしくは少額の状態で一度試していただくことをお勧めします。
      </li>
    </ul>
    <div class="text-center mt-6">
      <button
        v-show="!session.isConfirmNotice()"
        class="btn btn-primary text-white"
        @click="onConfirm"
      >
        注意事項を理解した上で利用を開始する
      </button>
    </div>
    <div class="card ring-1 ring-error mt-6" v-show="session.isConfirmNotice()">
      <div class="card-body">
        <h2 class="card-title text-error">
          <span class="material-symbols-outlined">warning</span>危険地帯
        </h2>
        <div class="text-md font-bold">データの初期化</div>
        <p class="text-sm">
          端末内に保存されているすべてのデータを削除します。
        </p>
        <div class="mt-2">
          <button
            v-show="session.isConfirmNotice()"
            class="btn btn-error text-white w-full md:w-48"
            onclick="delete_modal.showModal()"
          >
            データを初期化する
          </button>
        </div>
      </div>
    </div>
    <dialog id="delete_modal" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">データの初期化</h3>
        <p class="mt-2">
          初期化を行うと、現在登録されているデータはすべて削除されます。よろしいですか？
        </p>
        <div class="form-control mt-6">
          <label class="cursor-pointer flex gap-x-2">
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
  </div>
</template>
