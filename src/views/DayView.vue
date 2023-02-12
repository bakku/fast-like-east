<script setup lang="ts">
import { format } from "date-fns";
import deLocale from "date-fns/locale/de";
import enLocale from "date-fns/locale/en-GB";
import { getCurrentLocale } from "@/lib/helpers";
import { Locale } from "@/lib/types";

const props = defineProps<{
  day: number;
  month: number;
  year: number;
}>();

const date = new Date(props.year, props.month, props.day);
</script>

<template>
  <main class="flex h-screen justify-center items-center">
    <p class="text-2xl font-serif">
      {{
        format(date, $t("dateFormat"), {
          locale: getCurrentLocale() === Locale.DE ? deLocale : enLocale,
        })
      }}
    </p>
  </main>
</template>
