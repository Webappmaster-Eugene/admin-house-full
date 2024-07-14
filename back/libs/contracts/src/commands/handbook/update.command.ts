import { z } from 'zod';
import { HandbookSchema, ResponseClientSchema } from '../../models';
import { HandbookBusinessValueSchema } from '../../models/handbook/handbook-business-value.schema';
import { HandbookRelatedEntitiesSchema } from '../../models/handbook/handbook-related-entities.schema';

const HandbookUpdateResponseEntitySchema = HandbookBusinessValueSchema.merge(HandbookRelatedEntitiesSchema);

const HandbookUpdateRequestSchema = HandbookSchema.pick({
  name: true,
  canCustomerView: true,
  description: true,
}).partial();

const HandbookUpdateResponseSchema = z
  .object({
    data: HandbookUpdateResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace HandbookUpdateCommand {
  export const RequestSchema = HandbookUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = HandbookUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = HandbookUpdateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
