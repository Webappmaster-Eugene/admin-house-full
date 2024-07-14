import { InternalResponse } from '../../types/responses/universal-internal-response.interface';
import { EntityName } from '../../types/entity.enum';
import { IUrlParams } from '../../decorators/url-params.decorator';
import { InternalError } from 'src/common/errors/errors-description.backend';

export function errorExtractor(
  internalResponse: InternalResponse<InternalError>,
  entityName?: EntityName,
  urlParams?: IUrlParams,
): {
  statusCode: number;
  fullError: { name: string; description?: string };
  message: string;
} {
  const { httpCode, error } = internalResponse.data.innerError;
  const { url, method } = urlParams;
  const message =
    (entityName && urlParams && `An error while processing the \'${method}\' request to \'${url}\' url at \'${entityName}\' entity`) ||
    `An error while processing the request to url`;

  return {
    statusCode: httpCode,
    fullError: error,
    message,
  };
}
