<script setup lang="ts">
import { differenceInDays, format, getDay, isBefore, isEqual } from "date-fns";
import { currentLocale, dateFnsLocalizer } from "@/lib/constants";
import { fastingDays } from "@/days";
import { pluralize } from "@/lib/helpers";
import FastingInformation from "@/components/dayView/FastingInformation.vue";
import { computed } from "vue";
import { Locale } from "@/lib/types";

const props = defineProps<{
  date: Date;
}>();

const nextFastingDay = computed(() =>
  fastingDays.find(
    (d) => isEqual(props.date, d.date) || isBefore(props.date, d.date)
  )
);

const nameOfDay = computed(() => {
  if (
    nextFastingDay.value == null ||
    !isEqual(nextFastingDay.value.date, props.date) ||
    nextFastingDay.value.enName == null
  ) {
    return dateFnsLocalizer.day(getDay(props.date));
  }

  const { value: fastingDay } = nextFastingDay;

  return currentLocale == Locale.DE ? fastingDay.deName : fastingDay.enName;
});
</script>

<template>
  <div class="flex flex-col">
    <h1 class="text-8xl mt-4 text-center">{{ format(date, "dd") }}</h1>
    <h1 class="text-2xl mt-3 mb-8 text-center">
      {{ nameOfDay }}
    </h1>
  </div>

  <hr />

  <div class="flex justify-center items-center p-5">
    <h2 v-if="nextFastingDay == null" class="text-xl">
      {{ $t("dayCard.body.noFastingDayScheduled") }}
    </h2>
    <h2 v-else-if="isBefore(date, nextFastingDay.date)" class="text-xl">
      {{ $t("dayCard.body.nextFastingDayIsIn") }}
      {{ differenceInDays(nextFastingDay.date, date) }}
      {{
        pluralize(
          differenceInDays(nextFastingDay.date, date),
          $t("dayCard.body.daysSingular"),
          $t("dayCard.body.daysPlural")
        )
      }}.
    </h2>
    <fasting-information v-else :fasting-day="nextFastingDay" />
  </div>
</template>
