import { z } from 'zod';
import { HandbookSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const HandbookGetResponseSchema = z
  .object({
    data: HandbookSchema.pick({
      name: true,
      description: true,
      canCustomerView: true,
      uuid: true,
      responsibleManagerUuid: true,
      workspaceUuid: true,
      lastChangeByUserUuid: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace HandbookGetCommand {
  export const ResponseSchema = HandbookGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
