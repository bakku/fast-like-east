export enum Locale {
  DE,
  EN,
}

export enum FastingType {
  WINE = "wine",
  CHEESE = "cheese",
  FISH = "fish",
  STRICT = "strict",
  NONE = "none",
}

export interface FastingDay {
  date: Date;
  type: FastingType;
  enName: string | undefined;
  deName: string | undefined;
}
