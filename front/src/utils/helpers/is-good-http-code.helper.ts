import { STATUS_CODES } from 'src/utils/const/status-codes';

export function isGoodHttpCode(statusCode: number) {
  return statusCode === STATUS_CODES.OK || statusCode === STATUS_CODES.Created;
}
