import { Locale } from "@/lib/types";
import deLocale from "date-fns/locale/de";
import enLocale from "date-fns/locale/en-GB";

export const currentLocale =
  navigator.language.split("-")[0] === "de" ? Locale.DE : Locale.EN;

export const currentDateFnsLocale =
  currentLocale === Locale.DE ? deLocale : enLocale;

// We are only dealing with locales where the `localize` object is present.
export const dateFnsLocalizer = currentDateFnsLocale.localize!!;
