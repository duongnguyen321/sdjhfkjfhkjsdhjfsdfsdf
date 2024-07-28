import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import i18n from './i18n';
import { VueReCaptcha } from 'vue-recaptcha-v3';

library.add(faClock);


const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router)
app.use(i18n);
app.use(ElementPlus)
app.use(VueReCaptcha, { siteKey: '6LfwFxoqAAAAAAC9nFf7l75ngCwn9FYlxEHsuPPq' }); // Add reCAPTCHA
app.mount('#app')
