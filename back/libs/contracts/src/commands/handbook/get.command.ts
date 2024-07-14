import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { HandbookBusinessValueSchema } from '../../models/handbook/handbook-business-value.schema';
import { HandbookRelatedEntitiesSchema } from '../../models/handbook/handbook-related-entities.schema';

const HandbookGetResponseEntitySchema = HandbookBusinessValueSchema.merge(HandbookRelatedEntitiesSchema);

const HandbookGetResponseSchema = z
  .object({
    data: HandbookGetResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace HandbookGetCommand {
  export const ResponseSchema = HandbookGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = HandbookGetResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
