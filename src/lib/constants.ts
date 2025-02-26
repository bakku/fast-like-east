import { Locale } from "@/lib/types";
import { de, enGB } from "date-fns/locale";

export const currentLocale =
  navigator.language.split("-")[0] === "de" ? Locale.DE : Locale.EN;

export const currentDateFnsLocale = currentLocale === Locale.DE ? de : enGB;
