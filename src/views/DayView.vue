<script setup lang="ts">
import DayCard from "@/components/DayCard.vue";

defineProps<{
  date: Date;
}>();
</script>

<template>
  <main
    class="flex h-screen justify-center items-center bg-gradient-to-br from-red-400 to-red-500"
  >
    <day-card :date="date" />
  </main>
</template>
