import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { EstimateSectionBusinessValueSchema } from '../../models/estimate/estimate-section.schema';

const EstimateSectionDeleteResponseEntitySchema = EstimateSectionBusinessValueSchema;

const EstimateSectionDeleteResponseSchema = z
  .object({
    data: EstimateSectionDeleteResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace EstimateSectionDeleteCommand {
  export const ResponseSchema = EstimateSectionDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = EstimateSectionDeleteResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
