import { z } from 'zod';
import { EActiveStatusVariants } from '../../enums';

export const ProjectSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  projectStatus: EActiveStatusVariants,
  description: z.string().nullable().optional(),
  customerMail: z.string().email().optional().nullable(),
  organizationUuid: z.string().uuid(),
  customerUuid: z.string().uuid().optional().nullable(),
  responsibleManagerUuid: z.string().uuid(),
  lastChangeByUserUuid: z.string().uuid().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
