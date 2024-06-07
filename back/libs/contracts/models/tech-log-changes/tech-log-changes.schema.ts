import { z } from 'zod';
// import { json } from 'nestjs-zod/z';

export const TechLogChangesSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string().nullable().optional(),
  entity: z.string(),
  action: z.enum(['CREATE', 'UPDATE', 'DELETE']),
  comment: z.string().nullable().optional(),
  oldInfo: z.string().nullable().optional(),
  // newInfo: z.json(),
  // newInfo: z.quotelessJson(),
  newInfo: z.string(),
  updateInfo: z.string().nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
