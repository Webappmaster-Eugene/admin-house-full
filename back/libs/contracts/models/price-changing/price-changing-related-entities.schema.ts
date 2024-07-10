import { z } from 'zod';
import { MaterialBusinessValueSchema } from '../material';

export const PriceChangingRelatedEntitiesSchema = z.object({
  material: MaterialBusinessValueSchema,
});
