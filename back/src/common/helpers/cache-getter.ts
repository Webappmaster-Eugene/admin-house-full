import { CacheStore } from '@nestjs/cache-manager';

export async function cacheGetter<TEntity>(cacheManager: CacheStore, cacheKey: string) {
  const cachedData: TEntity = await cacheManager.get(cacheKey);
  return cachedData;
}
