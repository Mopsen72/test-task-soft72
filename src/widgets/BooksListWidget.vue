<template>
  <div>
    <div class="flex justify-center items-center p-2 gap-4">

      <InputText :disabled="loading" :model-value="searchString" placeholder="Поиск"
                 @update:model-value="updateSearchStringHandler"></InputText>

      <template v-if="total !== null">
        <div>Всего книг: {{ total }}</div>
        <div>Загружено: {{ rows.length }}</div>
      </template>
      <template v-if="hasMoreBook">
        <Button :disabled="loading" label="Загрузить еще" @click="getMoreHandler"></Button>
      </template>

    </div>
    <DataTable :value="rows">
      <Column field="title" header="Наименование книги"></Column>
      <Column field="authors" header="Автор(ы)"></Column>
      <Column field="publishedDate" header="дата публикации"></Column>
      <Column field="categories" header="категории"></Column>
    </DataTable>
  </div>
</template>

<script lang="ts" setup>
import DataTable from "primevue/datatable";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Column from "primevue/column";
import {computed, inject, onMounted, ref} from "vue";
import type {IBook, IBookGoogleAPI} from "../entities/books/types.ts";
import {loadingKey} from "../shared/injectionKeys/loadingKey.ts";
import {useBooksRepository} from "../entities/books/api.ts";
import debounce from "lodash.debounce";

const {loading, updateLoading} = inject(loadingKey)!;
const booksRepository = useBooksRepository();

const rows = ref<IBook[]>([]);
const page = ref<number>(1);
const total = ref<number | null>(null);

const hasMoreBook = computed<boolean>(() => {
  return !!(total.value && (rows.value.length < total.value))
})

const getBooks = async () => {
  if (!total.value || hasMoreBook.value) {
    try {
      updateLoading(true);

      const response = await booksRepository.getBooks(page.value, searchString.value)
      if (response.status === 200) {
        total.value = response.data.totalItems;
        let books: IBook[] = response.data.items.map((el: IBookGoogleAPI) => {
          return {
            id: el.id,
            title: el.volumeInfo.title,
            authors: el.volumeInfo.authors,
            publishedDate: el.volumeInfo.publishedDate,
            categories: el.volumeInfo.categories
          }
        })

        rows.value.push(...books);
      }

    } catch (e) {
      console.error(e);
    } finally {
      updateLoading(false);
    }
  }
}

const searchString = ref<string>("");

const updateSearchStringHandler = (newValue: string) => {
  searchString.value = newValue;

  updateSearchSideEffect()
}

const updateSearchSideEffect = debounce(
    async () => {
      total.value = null;
      page.value = 1;
      rows.value = [];
      await getBooks()
    }, 3000
)

const getMoreHandler = async () => {
  page.value++;
  await getBooks();
}

onMounted(async () => {
  await getBooks()
})

</script>

<style scoped>

</style>