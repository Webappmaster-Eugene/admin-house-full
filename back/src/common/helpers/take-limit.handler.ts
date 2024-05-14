import { QUANTITY_LIMIT } from '../consts/take-quantity.limitation';
import { InternalResponse } from '../types/responses/universal-internal-response.interface';
import { BackendErrorNames, InternalError } from '../errors/errors.backend';

export function limitTakeHandler(take) {
  if (take > QUANTITY_LIMIT.TAKE_MAX_LIMIT) {
    throw new InternalResponse(new InternalError(BackendErrorNames.INTERNAL_ERROR));
  }
}
