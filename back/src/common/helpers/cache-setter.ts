import { CacheStore } from '@nestjs/cache-manager';

export async function cacheSetter<TEntity>(cacheManager: CacheStore, cacheKey: string, cacheValue: TEntity) {
  return await this.cacheManager.set(cacheKey, cacheValue);
}
