import axios from 'axios';

import { paths } from 'src/routes/paths';

import { TokenType, TTokenType } from './token-type';
import { decodeAccessToken, decodeRefreshToken } from './decode.tokens';

export const isValidToken = (authToken: string, tokenType: TTokenType) => {
  if (!authToken) {
    return false;
  }

  const decodedToken =
    tokenType === TokenType.ACCESS_TOKEN
      ? decodeAccessToken(authToken)
      : decodeRefreshToken(authToken);

  const currentTime = Date.now();

  return decodedToken.exp > currentTime;
};

// ----------------------------------------------------------------------

export const tokenExpired = (exp: number) => {
  let expiredTimer;

  const currentTime = Date.now();

  // Test token expires after 10s
  // const timeLeft = currentTime + 10000 - currentTime; // ~10s
  const timeLeft = exp * 1000 - currentTime;

  clearTimeout(expiredTimer);

  expiredTimer = setTimeout(() => {
    alert('Token expired');

    sessionStorage.removeItem('accessToken');

    window.location.href = paths.auth.login;
  }, timeLeft);
};

// ----------------------------------------------------------------------

export const setSession = (accessToken: string | null) => {
  if (accessToken) {
    sessionStorage.setItem('accessToken', accessToken);

    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    // This function below will handle when token is expired
    const { exp } = decodeAccessToken(accessToken); // ~3 days by minimals server
    tokenExpired(exp);
  } else {
    sessionStorage.removeItem('accessToken');

    delete axios.defaults.headers.common.Authorization;
  }
};
