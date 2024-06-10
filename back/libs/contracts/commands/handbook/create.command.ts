import { z } from 'zod';
import { HandbookSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const HandbookCreateResponseEntitySchema = HandbookSchema.pick({
  name: true,
  description: true,
  canCustomerView: true,
  uuid: true,
  responsibleManagerUuid: true,
  workspaceUuid: true,
  lastChangeByUserUuid: true,
});

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
  .merge(ResponseClientSchema);

export namespace HandbookCreateCommand {
  export const RequestSchema = HandbookCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = HandbookCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = HandbookCreateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
