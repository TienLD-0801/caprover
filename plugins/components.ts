import EmojiPicker from 'vue3-emoji-picker';
import 'vue3-emoji-picker/css';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import VueEasyLightbox from 'vue-easy-lightbox';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('EmojiPicker', EmojiPicker);
  nuxtApp.vueApp.component('VueDatePicker', VueDatePicker);
  nuxtApp.vueApp.component('VueEasyLightbox', VueEasyLightbox);
});
