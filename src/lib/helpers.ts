import { getMonth, getDate, getYear } from "date-fns";

export const isPositiveInteger = (str: string) => {
  const num = Number(str);
  return Number.isInteger(num) && num > 0;
};

export const daysEqual = (d1: Date, d2: Date) =>
  getDate(d1) === getDate(d2) &&
  getMonth(d1) === getMonth(d2) &&
  getYear(d1) === getYear(d2);
