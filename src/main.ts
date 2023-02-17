import { createApp } from "vue";
import { createI18n } from "vue-i18n";

import App from "@/App.vue";
import router from "@/router";
import translations from "@/i18n";

import "@/assets/styles.css";
import { Locale } from "@/lib/types";
import { currentLocale } from "@/lib/constants";

const i18n = createI18n({
  locale: currentLocale === Locale.DE ? "de" : "en",
  fallbackLocale: "en",
  messages: translations,
});

const app = createApp(App);

app.use(i18n);
app.use(router);

app.mount("#app");
