import { z } from 'zod';
import { HandbookBusinessValueSchema } from '../../models/handbook/handbook-business-value.schema';
import { RequestGetAllQuerySchema, ResponseClientSchema } from '../../models';
import { HandbookRelatedEntitiesSchema } from '../../models/handbook/handbook-related-entities.schema';

const HandbookGetAllResponseEntitySchema = z.array(HandbookBusinessValueSchema.merge(HandbookRelatedEntitiesSchema));

const HandbookGetAllResponseSchema = z
  .object({
    data: HandbookGetAllResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace HandbookGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = HandbookGetAllResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = HandbookGetAllResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
