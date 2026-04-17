import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { EstimateSectionBusinessValueSchema, EstimateSectionSchema } from '../../models/estimate/estimate-section.schema';

const EstimateSectionUpdateResponseEntitySchema = EstimateSectionBusinessValueSchema;

const EstimateSectionUpdateRequestSchema = EstimateSectionSchema.pick({
  name: true,
  orderIndex: true,
  parentSectionUuid: true,
}).partial();

const EstimateSectionUpdateResponseSchema = z
  .object({
    data: EstimateSectionUpdateResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace EstimateSectionUpdateCommand {
  export const RequestSchema = EstimateSectionUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = EstimateSectionUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = EstimateSectionUpdateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
