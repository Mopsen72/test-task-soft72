<template>
  <main>
    <BooksListWidget></BooksListWidget>
    <router-view></router-view>
  </main>
</template>

<script lang="ts" setup>

import BooksListWidget from "../widgets/BooksListWidget.vue";
</script>

<style scoped>

</style>