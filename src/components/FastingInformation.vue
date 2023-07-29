<script setup lang="ts">
import type { FastingDay } from "@/lib/types";
import { fastingColor } from "@/lib/helpers";
import { computed } from "vue";

const props = defineProps<{
  fastingDay: FastingDay;
}>();

const color = computed(() => fastingColor(props.fastingDay.type));
const i18nPrefix = computed(() => `${props.fastingDay.type}`);
</script>

<template>
  <div class="flex">
    <div :class="`flex flex-none ml-5 items-center border-${color} border-r-2`">
      <h2 class="text-3xl mr-5">
        {{ $t(`dayCard.body.${i18nPrefix}.icon`) }}
      </h2>
    </div>
    <div class="grow ml-5">
      <h2 class="text-xl">
        {{ $t(`dayCard.body.${i18nPrefix}.title`) }}
      </h2>
      <h3 class="text-lg text-gray-500">
        {{ $t(`dayCard.body.${i18nPrefix}.subtitle`) }}
      </h3>
    </div>
  </div>
</template>
