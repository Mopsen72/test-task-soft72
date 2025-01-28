<template>
  <Dialog v-model:visible="visible" :header="book ? book.title : ''" class="w-2/3" modal
          @after-hide="closeDialogHandler">

    <template v-if="book">
      <div class="flex flex-col gap-2">
        <div>
          Авторы: {{ book.authors.join(" ") }}
        </div>
        <div>
          Дата публикации: {{ book.publishedDate }}
        </div>
        <div v-if="book.categories">
          Категории: {{ book.categories.join(" ") }}
        </div>
        <div v-if="book.description">
          Описание: {{ book.description }}
        </div>
      </div>
      <div class="mt-2 flex justify-end">
        <Button :to="{name:'books-edit-id', params:{bookId: route.params.bookId}}" as="router-link"
                label="Редактировать"></Button>
      </div>
    </template>

  </Dialog>
</template>

<script lang="ts" setup>
import Dialog from "primevue/dialog";
import Button from "primevue/button"
import {inject, onMounted, ref} from "vue";
import {useBooksRepository} from "../entities/books/api.ts";
import {useRoute, useRouter} from "vue-router";
import {loadingKey} from "../shared/injectionKeys/loadingKey.ts";
import {useToast} from "primevue/usetoast";
import type {IBook} from "../entities/books/types.d.ts";

const bookRepository = useBooksRepository();
const router = useRouter();
const route = useRoute();
const toast = useToast();

const {updateLoading} = inject(loadingKey)!;

const visible = ref<boolean>(false);

const book = ref<IBook & { description: string } | null>(null);

const getBook = async () => {
  try {
    updateLoading(true);
    let response = await bookRepository.getBookById(`${route.params.bookId}`)
    if (response.status === 200) {
      book.value = {
        id: response.data.id,
        title: response.data.volumeInfo.title,
        authors: response.data.volumeInfo.authors,
        publishedDate: response.data.volumeInfo.publishedDate,
        categories: response.data.volumeInfo.categories,
        description: response.data.volumeInfo.description
      }
      visible.value = true;

    } else {
      throw new Error("Ошибка при получении данных")
    }

  } catch (e) {
    toast.add({severity: "error", life: 3000, summary: "Ошибка", detail: "Проишла ошибка при получении данных"})
    await router.push({name: "books"})
  } finally {
    updateLoading(false);
  }
}

const closeDialogHandler = async () => {
  await router.push({name: "books"})
}

onMounted(async () => {
  await getBook()
})

</script>

<style scoped>

</style>