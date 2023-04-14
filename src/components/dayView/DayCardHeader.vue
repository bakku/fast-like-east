<script setup lang="ts">
import {
  addWeeks,
  eachDayOfInterval,
  endOfWeek,
  format,
  getDate,
  getDay,
  getMonth,
  getYear,
  isEqual,
  startOfWeek,
} from "date-fns";
import { currentDateFnsLocale, dateFnsLocalizer } from "@/lib/constants";
import { daysEqual, fastingColor } from "@/lib/helpers";
import router from "@/router";
import { fastingDays } from "@/days";
import type { FastingDay } from "@/lib/types";
import { computed } from "vue";

const props = defineProps<{
  date: Date;
}>();

const today = new Date();

const weekDays = computed(() =>
  eachDayOfInterval({
    start: startOfWeek(props.date),
    end: endOfWeek(props.date),
  })
);

const fastingDayIndicatorClass = (day: Date) => {
  const fastingDay: FastingDay | undefined = fastingDays.find((d) =>
    isEqual(day, d.date)
  );

  if (fastingDay != undefined) {
    return `w-[60%] h-1 bg-${fastingColor(
      fastingDay.type
    )} rounded-full mt-1 mb-1`;
  }

  return "w-[60%] h-1 mt-1 mb-1";
};

const handleDayClick = (day: Date) => {
  router.push({
    name: "day",
    params: {
      day: getDate(day),
      month: getMonth(day),
      year: getYear(day),
    },
  });
};

const goToLastWeek = () => {
  const day = startOfWeek(addWeeks(props.date, -1));

  router.push({
    name: "day",
    params: {
      day: getDate(day),
      month: getMonth(day),
      year: getYear(day),
    },
  });
};

const goToNextWeek = () => {
  const day = startOfWeek(addWeeks(props.date, 1));

  router.push({
    name: "day",
    params: {
      day: getDate(day),
      month: getMonth(day),
      year: getYear(day),
    },
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
    <div class="flex-grow">
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
        {{
          dateFnsLocalizer.day(getDay(day), {
            width: "narrow",
          })
        }}
      </p>
      <p>{{ format(day, "dd") }}</p>
      <span :class="fastingDayIndicatorClass(day)"></span>
    </div>
  </div>

  <hr />
</template>
