export const errorCatch = (error: unknown): string => {
  const message = (error as { response?: { data?: { message?: string } } })?.response?.data?.message;
  return message ?? '';
};
