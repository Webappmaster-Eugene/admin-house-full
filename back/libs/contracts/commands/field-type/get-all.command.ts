import { z } from 'zod';
import { FieldTypeSchema, RequestGetAllQuerySchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const FieldTypeGetAllResponseSchema = z
  .object({
    data: z.array(
      FieldTypeSchema.pick({
        name: true,
        description: true,
        jsType: true,
        lastChangeByUserUuid: true,
        uuid: true,
      }),
    ),
  })
  .merge(ResponseClientSchema);

export namespace FieldTypeGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = FieldTypeGetAllResponseSchema;
  export type Request = z.infer<typeof ResponseSchema>;
}
