import { AbstractClassType } from '../types/abstract.class';
import { BACKEND_ERRORS, BackendErrorNames, InternalError } from '../errors/errors.backend';

export function isOkCondition<TEntity>(
  ok: boolean,
  data: TEntity | TEntity[] | InternalError,
  Entity: AbstractClassType,
): data is TEntity | TEntity[] {
  if (ok) {
    if ((Array.isArray(data) && data[0] instanceof Entity) || data instanceof Entity) {
      return true;
    }
  }
}
