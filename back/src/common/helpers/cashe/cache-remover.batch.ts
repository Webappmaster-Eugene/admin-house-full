import { CacheStore } from '@nestjs/cache-manager';
import { cacheRemover } from './cache-remover';

export async function cacheRemoverBatch(cacheManager: CacheStore, cacheKeys: string[]) {
  await Promise.all(cacheKeys.map((key: string) => cacheRemover(cacheManager, key)));
}
