<template>
  <article class="bg-surface-100 dark:bg-surface-800 p-4 rounded-xl">
    <h6>{{ title }}</h6>
    <ul class="p-2 flex flex-col gap-2">
      <template v-for="item in list">
        <li>{{ item }}</li>
      </template>
    </ul>
  </article>
</template>

<script lang="ts" setup>
defineProps<{
  title: string,
  list: string[]
}>()
</script>

<style scoped>

</style>