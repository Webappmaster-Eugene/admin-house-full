import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { EstimateBusinessValueSchema } from '../../models/estimate/estimate-business-value.schema';
import { EstimateSectionBusinessValueSchema } from '../../models/estimate/estimate-section.schema';
import { EstimateItemBusinessValueSchema } from '../../models/estimate/estimate-item.schema';

const EstimateItemInSectionSchema = EstimateItemBusinessValueSchema;

const EstimateSectionInTreeSchema: z.ZodType<unknown> = z.lazy(() =>
  EstimateSectionBusinessValueSchema.extend({
    items: z.array(EstimateItemInSectionSchema),
    childSections: z.array(EstimateSectionInTreeSchema),
  }),
);

const EstimateGetResponseEntitySchema = EstimateBusinessValueSchema.extend({
  sections: z.array(EstimateSectionInTreeSchema),
});

const EstimateGetResponseSchema = z
  .object({
    data: EstimateGetResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace EstimateGetCommand {
  export const ResponseSchema = EstimateGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = EstimateGetResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
