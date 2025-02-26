import { format, getDate, getMonth, getYear, isEqual } from "date-fns";
import { type FastingDay, FastingType, Locale } from "@/lib/types";
import { currentDateFnsLocale, currentLocale } from "@/lib/constants";

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

export const fastingColor = (
  fastingType: FastingType,
  colorType: "background" | "border",
) => {
  switch (fastingType) {
    case FastingType.CHEESE:
      switch (colorType) {
        case "background":
          return "bg-yellow-300";
        case "border":
          return "border-yellow-300";
      }
      break;
    case FastingType.FISH:
      switch (colorType) {
        case "background":
          return "bg-blue-500";
        case "border":
          return "border-blue-500";
      }
      break;
    case FastingType.STRICT:
      switch (colorType) {
        case "background":
          return "bg-red-500";
        case "border":
          return "border-red-500";
      }
      break;
    case FastingType.WINE:
      switch (colorType) {
        case "background":
          return "bg-purple-600";
        case "border":
          return "border-purple-600";
      }
      break;
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

  return format(date, "EEEE", { locale: currentDateFnsLocale });
};
