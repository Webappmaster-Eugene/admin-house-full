import { z } from 'zod';

export const FileStorageSchema = z.object({
  uuid: z.string().uuid(),
  nameFile: z.string(),
  comment: z.string().nullable().optional(),
  link: z.string(),
  lastChangeByUserUuid: z.string().uuid().nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
