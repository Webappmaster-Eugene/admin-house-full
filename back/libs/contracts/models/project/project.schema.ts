import { z } from 'zod';

export const ProjectSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable().optional(),
  customerMail: z.string().email(),
  organizationUuid: z.string().uuid(),
  customerUuid: z.string().uuid(),
  responsibleManagerUuid: z.string().uuid(),
  lastChangeByUserUuid: z.string().uuid().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
