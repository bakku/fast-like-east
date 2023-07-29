import { getDate, getDay, getMonth, getYear, isEqual } from "date-fns";
import { type FastingDay, FastingType, Locale } from "@/lib/types";
import { currentLocale, dateFnsLocalizer } from "@/lib/constants";

export const isPositiveInteger = (str: string) => {
  const num = Number(str);
  return Number.isInteger(num) && num > 0;
};

export const daysEqual = (d1: Date, d2: Date) =>
  getDate(d1) === getDate(d2) &&
  getMonth(d1) === getMonth(d2) &&
  getYear(d1) === getYear(d2);

export const compartmentalizeDate = (d: Date) => ({
  day: getDate(d),
  month: getMonth(d),
  year: getYear(d),
});

export const pluralize = (count: number, singular: string, plural: string) => {
  if (count != 1) return plural;
  else return singular;
};

export const fastingColor = (type: FastingType) => {
  switch (type) {
    case FastingType.CHEESE:
      return "yellow-300";
    case FastingType.FISH:
      return "blue-500";
    case FastingType.STRICT:
      return "red-500";
    case FastingType.WINE:
      return "purple-600";
    case FastingType.NONE:
      return "";
  }
};

export const dateDayName = (date: Date, fastingDays: FastingDay[]) => {
  const dateAsFastingDay = fastingDays.find((d) => isEqual(d.date, date));

  if (dateAsFastingDay && dateAsFastingDay.enName && dateAsFastingDay.deName) {
    return currentLocale == Locale.DE
      ? dateAsFastingDay.deName
      : dateAsFastingDay.enName;
  }

  return dateFnsLocalizer.day(getDay(date));
};
