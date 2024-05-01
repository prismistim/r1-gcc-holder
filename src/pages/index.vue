<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const onConfirm = () => {
  sessionStorage.setItem('confirm_notice', 'ok')
  router.push('/list')
}

onMounted(() => {
  if (sessionStorage.getItem('confirm_notice') === 'ok') {
    router.push('/list')
  }
})
</script>

<template>
  <div class="my-4 py-4 flex flex-wrap justify-center">
    <img src="/logo.svg" class="w-32" />
  </div>
  <div class="text-3xl font-bold text-center">r1-gcc-holder</div>
  <div class="text-center mt-2">
    <a
      href="https://github.com/prismistim/r1-gcc-holder"
      target="_blank"
      class="text-lg inline-flex justify-center items-center py-1/2 text-primary font-semibold hover:opacity-50 transition-opacity duration-300 hover:cursor-pointer"
    >
      <span class="mr-1 material-symbols-outlined">open_in_new</span>GitHub
    </a>
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
        オフラインで動作可能（ここで登録したデータはすべて端末上で管理します）
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
    </ul>
    <div class="text-center mt-6">
      <button class="btn btn-primary text-white" @click="onConfirm">
        注意事項を理解した上で利用を開始する
      </button>
    </div>
  </div>
</template>
