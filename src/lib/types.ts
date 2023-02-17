export enum Locale {
  DE,
  EN,
}

export enum FastingType {
  WINE = "wine",
  CHEESE = "cheese",
  FISH = "fish",
  STRICT = "strict",
}

export interface FastingDay {
  date: Date;
  type: FastingType;
}
