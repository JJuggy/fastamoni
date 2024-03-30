export default {
  primary: '#4DABF5',
  secondary: '#00A5C6',
  accent: '#D8D4E5',
  white: '#fff',
  border: '#CFCECE',
  black: '#000000',
  red: '#EE1111CC',
  blue: '#3077FC',
  'black-shade': '#605D5A',
  in_active: '#424242',
  text_color: '#4DABF5',
  gray: 'rgba(112, 112, 112, 1)',
  dark_blue: 'rgba(14, 63, 102, 1)',
  app_bg: 'rgba(246, 247, 249, 1)',
  teal: 'rgba(176, 234, 242, 1)',
  warning: 'rgba(255, 249, 194, 1)',
  success: 'rgba(200, 230, 201, 1)',
  primaryLight: 'rgba(186, 222, 251, 1)',
  background: 'rgba(245, 245, 245, 1)',
  primary400: 'rgba(233, 245, 254, 0.4)',
};

export const randomColor = (arr: string[]) => {
  return arr[Math.floor(Math.random() * arr.length)];
};
