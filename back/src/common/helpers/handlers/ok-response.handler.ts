import { InternalError } from '../../../common/errors/errors-description.backend';
import { isOkResponseHandler } from '../../type-guards/is-ok-response.handler';
import { ExternalResponse } from '../../types/responses/universal-external-response.interface';
import { errorResponseHandler } from './error-response.handler';
import { ILogger } from '../../types/main/logger.interface';

export function okResponseHandler<TEntity>(ok: boolean, data: TEntity | InternalError, instanceLogger: ILogger): ExternalResponse<TEntity> {
  if (isOkResponseHandler(ok, data)) {
    return new ExternalResponse<TEntity>(data);
  } else {
    errorResponseHandler(instanceLogger, data);
  }
}
