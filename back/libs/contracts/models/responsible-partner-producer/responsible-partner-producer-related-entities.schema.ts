import { z } from 'zod';
import { MaterialBusinessValueSchema } from '../material';
import { HandbookBusinessValueSchema } from '../handbook';

export const ResponsiblePartnerProducerRelatedEntitiesSchema = z.object({
  handbook: HandbookBusinessValueSchema,
  materials: z.array(MaterialBusinessValueSchema).nullable().optional(),
});
