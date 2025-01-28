<template>
  <router-view v-slot="{Component}">
    <transition mode="out-in" name="app-fade">
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>

<script lang="ts" setup>

</script>

<style>

.app-fade-enter-active,
.app-fade-leave-active {
  transition: all 0.3s;
}

.app-fade-enter-from,
.app-fade-leave-to {
  opacity: 0;
  filter: blur(1rem);
}


</style>
