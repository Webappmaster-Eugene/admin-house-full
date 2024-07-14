import { z } from 'zod';
import { MaterialBusinessValueSchema } from '../material/material-business-value.schema';

export const PriceChangingRelatedEntitiesSchema = z.object({
  material: MaterialBusinessValueSchema,
});
