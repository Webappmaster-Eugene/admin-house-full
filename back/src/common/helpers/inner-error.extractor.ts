import { InternalResponse } from '../types/responses/universal-internal-response.interface';
import { EntityName } from '../types/entity.enum';
import { MethodName } from '../types/method.enum';
import { IUrlParams } from '../decorators/url-params.decorator';

export function errorExtractor(
  internalResponse: InternalResponse<unknown>,
  entityName: EntityName,
  urlParams: IUrlParams,
): {
  statusCode: number;
  fullError: { name: string; description?: string };
  message: string;
} {
  const { httpCode, error } = internalResponse.error.innerError;
  const { url, method } = urlParams;
  return {
    statusCode: httpCode,
    fullError: error,
    message: `An error while processing the \'${method}\' request to \'${url}\' url at \'${entityName}\' entity`,
  };
}
