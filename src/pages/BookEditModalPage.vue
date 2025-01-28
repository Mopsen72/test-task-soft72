<template>
  <Dialog v-model:visible="visible" :header="book ? book.title : ''" class="w-2/3" modal
          @after-hide="closeDialogHandler">

    <template v-if="book">
      <Form v-slot="$form" :initial-values="book" :resolver="validateSchema" class="flex flex-col gap-2" validateOnBlur
            @submit="submitHandler">
        <div class="flex flex-col gap-1">
          <InputText fluid name="title" placeholder="Наименование книги" type="text"/>
          <Message v-if="$form.title?.invalid" severity="error" size="small" variant="simple">
            {{ $form.title.error.message }}
          </Message>
        </div>
        <Button label="Сохранить" severity="secondary" type="submit"/>
      </Form>
    </template>

  </Dialog>
</template>

<script lang="ts" setup>
import Dialog from 'primevue/dialog';
import InputText from "primevue/inputtext";
import Message from "primevue/message";
import Button from "primevue/button";
import {Form, type FormSubmitEvent} from '@primevue/forms';
import {inject, onMounted, ref} from "vue";
import {useBooksRepository} from "../entities/books/api.ts";
import {useRoute, useRouter} from "vue-router";
import {loadingKey} from "../shared/injectionKeys/loadingKey.ts";
import {useToast} from "primevue/usetoast";
import type {IBook} from "../entities/books/types.d.ts";
import {yupResolver} from '@primevue/forms/resolvers/yup';
import yup from "../shared/utils/yupUtil.ts";

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

const validateSchema = yupResolver(yup.object({
  title: yup.string().required().max(250)
}))

const closeDialogHandler = async () => {
  await router.push({name: "books"})
}

const submitHandler = async (formState: FormSubmitEvent) => {
  if (formState.valid) {
    //пока не догадался как на FSD правильно будет размещать такие компоненты. из текущего положения, вне виджета BooksListWidget не понятно как передать событие, что нужно обновить строку.
    //а помещени "Page" в слой "widgets" - на правильно
    toast.add({severity: "success", life: 3000, summary: "Успешно", detail: "Данные успешно сохранены"});
    await closeDialogHandler();
  }
}

onMounted(async () => {
  await getBook()
})

</script>

<style scoped>

</style>