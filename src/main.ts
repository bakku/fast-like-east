import { createApp } from "vue";
import { createI18n } from "vue-i18n";

import App from "@/App.vue";
import router from "@/router";
import translations from "@/i18n";

import "@/assets/styles.css";
import { getCurrentLocale } from "@/lib/helpers";
import { Locale } from "@/lib/types";

const i18n = createI18n({
  locale: getCurrentLocale() === Locale.DE ? "de" : "en",
  fallbackLocale: "en",
  messages: translations,
});

const app = createApp(App);

app.use(i18n);
app.use(router);

app.mount("#app");
