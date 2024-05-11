import { CacheStore } from '@nestjs/cache-manager';

export async function cacheRemover(cacheManager: CacheStore, cacheKey: string) {
  await cacheManager.del(cacheKey);
}
