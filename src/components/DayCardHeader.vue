<script setup lang="ts">
import {
  addWeeks,
  eachDayOfInterval,
  endOfWeek,
  format,
  isEqual,
  startOfWeek,
} from "date-fns";
import { currentDateFnsLocale } from "@/lib/constants";
import { compartmentalizeDate, daysEqual, fastingColor } from "@/lib/helpers";
import { fastingDays } from "@/days";
import type { FastingDay } from "@/lib/types";
import { FastingType } from "@/lib/types";
import { computed } from "vue";
import { useRouter } from "vue-router";

const props = defineProps<{
  date: Date;
}>();

const router = useRouter();

const today = new Date();

const weekDays = computed(() =>
  eachDayOfInterval({
    start: startOfWeek(props.date),
    end: endOfWeek(props.date),
  }),
);

const fastingDayIndicatorClass = (day: Date) => {
  const fastingDay: FastingDay | undefined = fastingDays.find(
    (d) => isEqual(day, d.date) && d.type != FastingType.NONE,
  );

  const baseClasses = "w-[60%] h-1 mt-1 mb-1";

  if (fastingDay != undefined) {
    return `${baseClasses} ${fastingColor(fastingDay.type, "background")} rounded-full`;
  }

  return baseClasses;
};

const handleDayClick = (day: Date) => {
  router.push({
    name: "day",
    params: compartmentalizeDate(day),
  });
};

const goToLastWeek = () => {
  const day = startOfWeek(addWeeks(props.date, -1));

  router.push({
    name: "day",
    params: compartmentalizeDate(day),
  });
};

const goToNextWeek = () => {
  const day = startOfWeek(addWeeks(props.date, 1));

  router.push({
    name: "day",
    params: compartmentalizeDate(day),
  });
};
</script>

<template>
  <div class="pt-2 pb-2 flex">
    <div
      class="flex-grow-[0.2] flex items-center justify-center cursor-pointer"
      @click="goToLastWeek"
    >
      <div
        class="border-t-2 border-l-2 border-gray-600 w-3 h-3 -rotate-45"
      ></div>
    </div>
    <div class="grow">
      <p class="text-2xl text-center text-gray-600">
        {{ format(date, "MMMM yyyy", { locale: currentDateFnsLocale }) }}
      </p>
    </div>
    <div
      class="flex-grow-[0.2] flex items-center justify-center cursor-pointer"
      @click="goToNextWeek"
    >
      <div
        class="border-t-2 border-r-2 border-gray-600 w-3 h-3 rotate-45"
      ></div>
    </div>
  </div>

  <hr class="mb-2 mt-1" />

  <div class="grid grid-cols-7 text-center text-gray-600">
    <div
      v-for="day in weekDays"
      :key="day.getDate()"
      :class="`flex flex-col justify-center items-center m-1 cursor-pointer ${
        daysEqual(day, date) ? 'bg-red-300' : ''
      } ${daysEqual(today, day) ? 'border border-red-500' : ''}`"
      @click="handleDayClick(day)"
    >
      <p>
        {{ format(day, "EEEEE", { locale: currentDateFnsLocale }) }}
      </p>
      <p>{{ format(day, "dd") }}</p>
      <span :class="fastingDayIndicatorClass(day)"></span>
    </div>
  </div>

  <hr />
</template>
