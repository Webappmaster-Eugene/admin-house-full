import { z } from 'zod';
import { HandbookSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const HandbookUpdateRequestSchema = HandbookSchema.pick({
  name: true,
  canCustomerView: true,
  description: true,
}).partial();

const HandbookUpdateResponseSchema = z
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

export namespace HandbookUpdateCommand {
  export const RequestSchema = HandbookUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = HandbookUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
