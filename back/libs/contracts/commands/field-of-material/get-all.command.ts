import { z } from 'zod';
import { FieldTypeSchema, RequestGetAllQuerySchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const FieldOfMaterialGetAllResponseSchema = z
  .object({
    data: z.array(
      FieldOfMaterialSchema.omit({
        createdAt: true,
        updatedAt: true,
      }),
    ),
  })
  .merge(ResponseClientSchema);

export namespace FieldOfMaterialGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = FieldOfMaterialGetAllResponseSchema;
  export type Request = z.infer<typeof ResponseSchema>;
}
