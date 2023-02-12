export const isPositiveInteger = (str: string) => {
  const num = Number(str);
  return Number.isInteger(num) && num > 0;
};
