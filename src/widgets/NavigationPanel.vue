<template>
  <nav class="flex justify-center gap-2">
    <Button as="router-link" label="Список книг" severity="secondary" to="books"></Button>
    <Button as="router-link" label="Об мне" severity="secondary" to="me"></Button>
  </nav>
</template>

<script lang="ts" setup>
import {Button} from "primevue";
</script>


<style scoped>

</style>