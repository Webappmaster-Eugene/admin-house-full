import { CacheStore } from '@nestjs/cache-manager';
import { cacheRemover } from './cache-remover';

export async function cacheRemoverBatch(cacheManager: CacheStore, cacheKeys: string[]) {
  cacheKeys.map(async (key: string) => {
    await cacheRemover(cacheManager, key);
  });
}
