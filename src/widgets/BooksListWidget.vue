<template>
  <div>
    <DataTable>
      <Column field="title" header="Наименование книги"></Column>
      <Column field="authors" header="Автор(ы)"></Column>
      <Column field="publishedDate" header="дата публикации"></Column>
      <Column field="categories" header="категории"></Column>
    </DataTable>
  </div>
</template>

<script lang="ts" setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
</script>

<style scoped>

</style>