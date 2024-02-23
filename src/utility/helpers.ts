export const isUpperCase = (string: string) => /[A-Z]/.test(string);
export const isLowerCase = (string: string) => /[a-z]/.test(string);

export const hasNumber = (string: string) => /[0-9]/.test(string);

export const formatAmount = (value: any) =>
  Number(value)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,');

export const capitalizeFirstLetter = (string: string): string =>
  string.charAt(0).toUpperCase() + string.slice(1);
