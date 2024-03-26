<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="text-xl">r1-gcc-holder</div>
  <div class="text-lg font-bold mt-4">このアプリは何？</div>
  <ul class="list-disc list-inside mt-2">
    <li>某アミューズメント施設のプリペイドカードの保存、表示が可能なアプリ</li>
    <li>カードに記されたQRコードと同じものを表示</li>
    <li>有効期限をカレンダーにリマインドとして追加可能</li>
    <li>オフラインで動作可能（ここで扱うデータはすべて端末上で管理します）</li>
  </ul>
  <div class="text-lg font-bold mt-4">注意事項</div>
  <ul class="list-disc list-inside mt-2">
    <li>本アプリは元サービスの運営会社側の許諾を得て開発したものではありません。カードに関するシステムの権利等は運営会社に帰属します。</li>
    <li>完全な動作の保証はできかねます。自己責任で利用してください。</li>
    <li>本アプリに関する内容に関して、元サービスの運営会社へのお問い合わせはご遠慮ください。</li>
  </ul>
  <div class="text-center mt-6">
    <RouterLink to="/list" class="btn btn-error">注意事項を理解した上で利用を開始する</RouterLink>
  </div>
</template>
