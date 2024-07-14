import { z } from 'zod';
import { HandbookBusinessValueSchema } from '../handbook/handbook-business-value.schema';
import { MaterialBusinessValueSchema } from '../material/material-business-value.schema';

export const ResponsiblePartnerProducerRelatedEntitiesSchema = z.object({
  handbook: HandbookBusinessValueSchema,
  materials: z.array(MaterialBusinessValueSchema).nullable().optional(),
});
