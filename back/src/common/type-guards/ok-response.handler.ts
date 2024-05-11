import { AbstractClassType } from '../types/abstract.class';
import { InternalError } from '../errors/errors.backend';
import { isOkCondition } from '../helpers/data.response.condition';
import { ExternalResponse } from '../types/responses/universal-external-response.interface';
import { errorResponseHandler } from '../helpers/error-response.handler';
import { ILogger } from '../types/main/logger.interface';

export function okResponseHandler<TEntity>(
  ok: boolean,
  data: TEntity | InternalError,
  Entity: AbstractClassType,
  instanceLogger: ILogger,
): ExternalResponse<TEntity> {
  if (isOkCondition(ok, data, Entity)) {
    return new ExternalResponse<TEntity>(data);
  } else {
    errorResponseHandler(instanceLogger, data);
  }
}
