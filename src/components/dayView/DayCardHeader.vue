<script setup lang="ts">
import {
  eachDayOfInterval,
  endOfWeek,
  format,
  getDate,
  getDay,
  getMonth,
  getYear,
  startOfWeek,
} from "date-fns";
import { currentDateFnsLocale, dateFnsLocalizer } from "@/lib/constants";
import { daysEqual } from "@/lib/helpers";
import router from "@/router";

const props = defineProps<{
  date: Date;
}>();

const weekDays = eachDayOfInterval({
  start: startOfWeek(props.date),
  end: endOfWeek(props.date),
});

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
</script>

<template>
  <div class="pt-2 pb-2">
    <p class="text-2xl text-center text-gray-600">
      {{ format(date, "MMMM yyyy", { locale: currentDateFnsLocale }) }}
    </p>
  </div>

  <hr class="mb-2 mt-1" />

  <div class="grid grid-cols-7 text-center text-gray-600">
    <div
      v-for="day in weekDays"
      :key="day.getDate()"
      :class="`flex flex-col justify-center items-center m-1 cursor-pointer ${
        daysEqual(day, date) ? 'bg-orange-200' : ''
      }`"
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
      <span class="w-[60%] h-1 bg-green-500 rounded-full mt-1 mb-1"></span>
    </div>
  </div>

  <hr />
</template>
