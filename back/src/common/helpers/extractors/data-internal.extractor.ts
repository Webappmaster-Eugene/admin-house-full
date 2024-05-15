import { UniversalInternalResponse } from '../../types/responses/universal-internal-response.interface';

export function dataInternalExtractor<TEntity>(dataInternalResponse: UniversalInternalResponse<TEntity>): TEntity {
  const { ok, data } = dataInternalResponse;
  if (ok) {
    return data as TEntity;
  }
}
