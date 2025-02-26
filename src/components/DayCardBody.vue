<script setup lang="ts">
import { differenceInDays, format, isBefore, isEqual } from "date-fns";
import { fastingDays } from "@/days";
import { dateDayName, pluralize } from "@/lib/helpers";
import FastingInformation from "@/components/FastingInformation.vue";
import { computed } from "vue";
import { FastingType } from "@/lib/types";

const props = defineProps<{
  date: Date;
}>();

const nextFastingDay = computed(() =>
  fastingDays.find(
    (d) =>
      d.type != FastingType.NONE &&
      (isEqual(props.date, d.date) || isBefore(props.date, d.date)),
  ),
);

const nameOfDay = computed(() => dateDayName(props.date, fastingDays));
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
    <h2 v-if="!nextFastingDay" class="text-xl">
      {{ $t("dayCard.body.noFastingDayScheduled") }}
    </h2>
    <h2 v-else-if="isBefore(date, nextFastingDay.date)" class="text-xl">
      {{ $t("dayCard.body.nextFastingDayIsIn") }}
      {{ differenceInDays(nextFastingDay.date, date) }}
      {{
        pluralize(
          differenceInDays(nextFastingDay.date, date),
          $t("dayCard.body.daysSingular"),
          $t("dayCard.body.daysPlural"),
        )
      }}.
    </h2>
    <fasting-information v-else :fasting-day="nextFastingDay" />
  </div>
</template>
