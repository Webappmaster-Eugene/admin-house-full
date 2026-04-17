import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { EstimateSectionBusinessValueSchema, EstimateSectionSchema } from '../../models/estimate/estimate-section.schema';

const EstimateSectionCreateResponseEntitySchema = EstimateSectionBusinessValueSchema;

const EstimateSectionCreateRequestSchema = EstimateSectionSchema.pick({
  name: true,
  orderIndex: true,
  parentSectionUuid: true,
}).partial({ parentSectionUuid: true });

const EstimateSectionCreateResponseSchema = z
  .object({
    data: EstimateSectionCreateResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace EstimateSectionCreateCommand {
  export const RequestSchema = EstimateSectionCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = EstimateSectionCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = EstimateSectionCreateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
