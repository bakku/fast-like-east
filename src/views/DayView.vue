<script setup lang="ts">
defineProps<{
  day: number;
  month: number;
  year: number;
}>();
</script>

<template>
  <p>Day {{ day }}</p>
  <p>Month {{ month }}</p>
  <p>Day {{ year }}</p>
</template>
