import { z } from 'zod';

export const ProjectSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  customerMail: z.string().email(),
  description: z.string().nullable(),
  organizationUuid: z.string(),
  customerUuid: z.string(),
  responsibleManagerUuid: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
