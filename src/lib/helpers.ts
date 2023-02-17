import { getMonth, getDate, getYear } from "date-fns";
import { FastingType } from "@/lib/types";

export const isPositiveInteger = (str: string) => {
  const num = Number(str);
  return Number.isInteger(num) && num > 0;
};

export const daysEqual = (d1: Date, d2: Date) =>
  getDate(d1) === getDate(d2) &&
  getMonth(d1) === getMonth(d2) &&
  getYear(d1) === getYear(d2);

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
  }
};
