import { z } from 'zod';
import { HandbookSchema, RequestGetAllQuerySchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const HandbookGetAllResponseSchema = z
  .object({
    data: z.array(
      HandbookSchema.pick({
        name: true,
        description: true,
        canCustomerView: true,
        uuid: true,
        responsibleManagerUuid: true,
        workspaceUuid: true,
        lastChangeByUserUuid: true,
      }),
    ),
  })
  .merge(ResponseClientSchema);

export namespace HandbookGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = HandbookGetAllResponseSchema;
  export type Request = z.infer<typeof ResponseSchema>;
}
