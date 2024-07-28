import { createI18n } from 'vue-i18n';
import en from './en';
import vi from './vi';
import zh from './zh';

const messages = {
    en,
    vi,
    zh
};

const i18n = createI18n({
    legacy: false, // Sử dụng chế độ Composition API
    locale: 'vi', // Ngôn ngữ mặc định
    fallbackLocale: 'en',
    messages,
});

export default i18n;