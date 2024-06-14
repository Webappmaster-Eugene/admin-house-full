export const errorCatch = (error: any): string => {
  const message = error?.response.data.message;
  // if (typeof message === 'object') {
  //   return message[0];
  // }
  return message;
};
