import {createApp} from 'vue';
import '../shared/css/style.css';
import App from './App.vue';
import {router} from "./router";
import PrimeVue from 'primevue/config';
import {MyPreset} from "./primeTheme.ts";


createApp(App).use(router).use(PrimeVue, {
    theme: {
        preset: MyPreset,
    }
}).mount('#app')
