import { z } from 'zod';
import { HandbookSchema, ResponseClientSchema } from '../../models';
import { HandbookRelatedEntitiesSchema } from '../../models/handbook/handbook-related-entities.schema';
import { HandbookBusinessValueSchema } from '../../models/handbook/handbook-business-value.schema';

const HandbookCreateResponseEntitySchema = HandbookBusinessValueSchema.merge(HandbookRelatedEntitiesSchema);

const HandbookCreateRequestSchema = HandbookSchema.pick({
  name: true,
  description: true,
  canCustomerView: true,
  workspaceUuid: true,
  handbookStatus: true,
});

const HandbookCreateResponseSchema = z
  .object({
    data: HandbookCreateResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace HandbookCreateCommand {
  export const RequestSchema = HandbookCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = HandbookCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = HandbookCreateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
