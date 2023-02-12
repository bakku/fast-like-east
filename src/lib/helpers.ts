import { Locale } from "@/lib/types";

export const isPositiveInteger = (str: string) => {
  const num = Number(str);
  return Number.isInteger(num) && num > 0;
};

export const getCurrentLocale = () => {
  if (navigator.language.split("-")[0] === "de") return Locale.DE;
  return Locale.EN;
};
