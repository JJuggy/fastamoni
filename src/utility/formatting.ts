export const filterOnlyText = (text: string) => {
  const chars = '1234567890abcdefghijklmnopqrstuvwxyz'.split('');
  const stripped = text.split('').filter(char => char in chars);
  return stripped.join('');
};

export const capitalizeString = (sentence: string): string => {
  return sentence.replace(/(^\w{1})|(\s+\w{1})/g, letter =>
    letter.toUpperCase(),
  );
};
