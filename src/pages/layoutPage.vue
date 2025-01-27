<template>
  <div class="container mx-auto h-svh">
    <div class="sticky top-0 p-2">
      <NavigationPanel></NavigationPanel>
      <ProgressBar :style="{visibility: loading? 'visible' :'hidden', height: '0.5rem'}"
                   mode="indeterminate"></ProgressBar>
    </div>
    <div>
      <router-view v-slot="{Component}">
        <transition mode="out-in" name="scale-content">
          <component :is="Component"></component>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import NavigationPanel from "../widgets/NavigationPanel.vue";
import ProgressBar from 'primevue/progressbar';
import {ref} from "vue";

const loading = ref<boolean>(false);

</script>

<style scoped>
.scale-content-enter-active {
  transition: all 0.4s ease-out;
}

.scale-content-leave-active {
  transition: all 0.4s ease;
}

.scale-content-enter-from {
  transform: scale(0.75);
  filter: blur(0.5rem);
  opacity: 0;
}

.scale-content-leave-to {
  transform: scale(0.75);
  filter: blur(0.5rem);
  opacity: 0;
}

</style>