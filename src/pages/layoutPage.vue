<template>
  <div class="container mx-auto h-svh relative">
    <div class="sticky top-0 p-2 z-20">
      <NavigationPanel></NavigationPanel>
      <ProgressBar :style="{visibility: loading ? 'visible' :'hidden', height: '0.5rem'}"
                   mode="indeterminate"></ProgressBar>
    </div>
    <div>
      <router-view v-slot="{Component}">
        <transition mode="out-in" name="scale-content">
          <component :is="Component"></component>
        </transition>
      </router-view>
    </div>
    <Toast/>
  </div>
</template>

<script lang="ts" setup>
import NavigationPanel from "../widgets/NavigationPanel.vue";
import ProgressBar from 'primevue/progressbar';
import Toast from "primevue/toast";
import {provide, ref} from "vue";
import {loadingKey} from "../shared/injectionKeys/loadingKey.ts";

const loading = ref<boolean>(false);

const updateLoading = (value: boolean) => {
  loading.value = value
}

provide(loadingKey, {loading: loading, updateLoading: updateLoading})

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