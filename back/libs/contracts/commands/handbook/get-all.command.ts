import { z } from 'zod';
import { HandbookSchema, RequestGetAllQuerySchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const HandbookGetAllResponseEntitySchema = z.array(
  HandbookSchema.pick({
    name: true,
    description: true,
    canCustomerView: true,
    uuid: true,
    responsibleManagerUuid: true,
    workspaceUuid: true,
    lastChangeByUserUuid: true,
  }),
);

const HandbookGetAllResponseSchema = z
  .object({
    data: HandbookGetAllResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace HandbookGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = HandbookGetAllResponseSchema;
  export type Request = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = HandbookGetAllResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
