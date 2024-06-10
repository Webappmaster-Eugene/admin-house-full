import { z } from 'zod';
import { HandbookSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const HandbookGetResponseEntitySchema = HandbookSchema.pick({
  name: true,
  description: true,
  canCustomerView: true,
  uuid: true,
  responsibleManagerUuid: true,
  workspaceUuid: true,
  lastChangeByUserUuid: true,
});

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
