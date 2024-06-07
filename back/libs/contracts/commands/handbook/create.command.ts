import { z } from 'zod';
import { HandbookSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const HandbookCreateRequestSchema = HandbookSchema.pick({
  name: true,
  description: true,
  canCustomerView: true,
  workspaceUuid: true,
});

const HandbookCreateResponseSchema = z
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

export namespace HandbookCreateCommand {
  export const RequestSchema = HandbookCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = HandbookCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
