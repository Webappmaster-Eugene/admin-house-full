import { z } from 'zod';
import { HandbookBusinessValueSchema, HandbookRelatedEntitiesSchema, HandbookSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

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
