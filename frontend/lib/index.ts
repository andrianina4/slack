export const getInitialName = (str: string | undefined) => {
  if (str) return str[0].toUpperCase();
  else return "";
};
