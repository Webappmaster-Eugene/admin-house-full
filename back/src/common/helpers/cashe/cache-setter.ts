import { CacheStore } from '@nestjs/cache-manager';

export async function cacheSetter<TEntity>(cacheManager: CacheStore, cacheKey: string, cacheValue: TEntity) {
  return cacheManager.set(cacheKey, cacheValue);
}
