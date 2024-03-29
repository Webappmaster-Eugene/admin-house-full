import { Prisma } from '@prisma/client';

export interface ICrudCommon<ENTITY> {
  getById: (id: string) => Promise<ENTITY | null>;
  create: (dto: unknown) => Promise<ENTITY>;
  updateById: (id: string, dto: unknown) => Promise<ENTITY>;
  deleteByIds: (ids: string[]) => Promise<Prisma.BatchPayload>;
  findByCriteria: (
    dto: unknown,
    sort: Record<string, string>[],
  ) => Promise<ENTITY[]>;
}
