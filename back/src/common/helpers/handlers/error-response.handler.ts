import { errorExtractor } from '../extractors/error.extractor';
import { EntityName } from '../../types/entity.enum';
import { ExternalResponse } from '../../types/responses/universal-external-response.interface';
import { HttpException } from '@nestjs/common';
import { BACKEND_ERRORS, BackendErrorNames } from '../../../common/errors/errors-description.backend';
import { IUrlParams } from '../../decorators/url-params.decorator';
import { ILogger } from '../../types/main/logger.interface';
import { loggerError } from '../../utils/logger/logger.error';
import { InternalResponse } from '../../types/responses/universal-internal-response.interface';

export function errorResponseHandler(instanceLogger: ILogger, error: unknown, entityName?: EntityName, urlParams?: IUrlParams) {
  if (error instanceof InternalResponse) {
    const internalFullError = errorExtractor(error, entityName, urlParams);
    const { statusCode, fullError, message } = internalFullError;
    const response = new ExternalResponse(null, statusCode, message, [fullError]);
    loggerError(instanceLogger, internalFullError);
    throw new HttpException(response, response?.statusCode);
  } else {
    loggerError(instanceLogger, error);
    const response = new ExternalResponse(
      null,
      BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.INTERNAL_ERROR].httpCode,
      BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.INTERNAL_ERROR].error.description,
      [error],
    );
    throw new HttpException(response, response?.statusCode);
  }
}
