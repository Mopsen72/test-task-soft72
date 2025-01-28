<template>
  <div class="flex flex-col">
    <header class="my-4">
      <h1 class="text-3xl font-bold">Об мне</h1>
    </header>

    <section class="my-4">Данный раздел посвещен информации об мне, а так же использованию семантической верстки
    </section>

    <main>
      <article>
        Меня зовут Жиряков Евгений Дмитриевич. Я fronted-разработчик с 3-х летним стажем.
        <a class="underline transition-all hover:text-primary"
           href="https://hh.ru/resume/f41d537fff091cc28e0039ed1f4e457a493073" target="_blank">мое
          резюмe</a>
      </article>

      <section class="flex gap-2 justify-between my-4">
        <CardListInfo :list="['Vue 3', 'Vue-router', 'primeVue', 'tailwindCSS', 'FSD']"
                      title="Мой стек в этом проект:"></CardListInfo>

        <CardListInfo :list="['Vue 3', 'Vue-router', 'vuex', 'pinia', 'quasar framework', 'tailwindCSS', 'SCSS/SASS']"
                      title="Мои наиболее изученные технологии:"></CardListInfo>


        <CardListInfo :list="['TypeScript', 'FSD', 'primeVue', 'naiveUI', 'nuxt 3', 'docker', 'vite']"
                      title="Технологии с которыми я знаком:"></CardListInfo>
      </section>
    </main>
  </div>
</template>

<script lang="ts" setup>

import CardListInfo from "../shared/cards/CardListInfo.vue";
</script>

<style scoped>

</style>