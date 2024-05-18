import { InternalError } from '../errors/errors.backend';

export function isOkResponseHandler<TEntity>(ok: boolean, data: TEntity | TEntity[] | InternalError): data is TEntity | TEntity[] {
  if (ok && !(data instanceof InternalError)) {
    return true;
  }
}
