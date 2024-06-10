export const TokenType = {
  ACCESS_TOKEN: 'ACCESS_TOKEN',
  REFRESH_TOKEN: 'REFRESH_TOKEN',
};

export type TTokenType = keyof typeof TokenType;
