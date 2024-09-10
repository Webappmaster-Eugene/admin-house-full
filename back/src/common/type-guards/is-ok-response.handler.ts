import { InternalError } from '../../common/errors/errors-description.backend';

export function isOkResponseHandler<TEntity>(ok: boolean, data: TEntity | TEntity[] | InternalError): data is TEntity | TEntity[] {
  if (ok && !(data instanceof InternalError)) {
    return true;
  }
}
