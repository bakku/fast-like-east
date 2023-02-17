<script setup lang="ts">
import { format, getDay } from "date-fns";
import { dateFnsLocalizer } from "@/lib/constants";

defineProps<{
  date: Date;
}>();
</script>

<template>
  <div class="flex flex-col">
    <h1 class="text-8xl mt-4 text-center">{{ format(date, "dd") }}</h1>
    <h1 class="text-2xl mt-3 mb-8 text-center">
      {{ dateFnsLocalizer.day(getDay(date)) }}
    </h1>
  </div>
</template>
