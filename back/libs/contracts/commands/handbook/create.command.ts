import { z } from 'zod';
import { HandbookBusinessValueSchema, HandbookSchema } from '../../models';
import { ResponseClientSchema } from '../../models';
import { HandbookRelatedEntitiesSchema } from '../../models';

const HandbookCreateResponseEntitySchema = HandbookBusinessValueSchema.merge(HandbookRelatedEntitiesSchema.strict());

const HandbookCreateRequestSchema = HandbookSchema.pick({
  name: true,
  description: true,
  canCustomerView: true,
  workspaceUuid: true,
});

const HandbookCreateResponseSchema = z
  .object({
    data: HandbookCreateResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace HandbookCreateCommand {
  export const RequestSchema = HandbookCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = HandbookCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = HandbookCreateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
