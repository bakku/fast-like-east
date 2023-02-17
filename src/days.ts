import { FastingType } from "@/lib/types";
import type { FastingDay } from "@/lib/types";

export const fastingDays = [
  {
    date: new Date(2023, 1, 22),
    type: FastingType.STRICT,
  },
  {
    date: new Date(2023, 1, 23),
    type: FastingType.STRICT,
  },
  {
    date: new Date(2023, 1, 24),
    type: FastingType.STRICT,
  },
  {
    date: new Date(2023, 1, 25),
    type: FastingType.WINE,
  },
  {
    date: new Date(2023, 1, 26),
    type: FastingType.WINE,
  },
] as Array<FastingDay>;
