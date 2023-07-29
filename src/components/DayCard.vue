<script setup lang="ts">
import DayCardHeader from "@/components/DayCardHeader.vue";
import DayCardBody from "@/components/DayCardBody.vue";

defineProps<{
  date: Date;
}>();
</script>

<template>
  <div
    class="max-w-[28rem] w-[80%] shadow-xl pt-2 font-serif bg-white rounded-lg"
  >
    <day-card-header :date="date" />
    <day-card-body :date="date" />
  </div>
</template>
