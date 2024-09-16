import { z } from 'zod';
import { EActiveStatusVariants } from '../../enums';

export const OrganizationSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  organizationStatus: EActiveStatusVariants.nullish().default('ACTIVE'),
  description: z.string().nullable().optional(),
  workspaceUuid: z.string().uuid(),
  organizationLeaderUuid: z.string().uuid(),
  lastChangeByUserUuid: z.string().uuid().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
