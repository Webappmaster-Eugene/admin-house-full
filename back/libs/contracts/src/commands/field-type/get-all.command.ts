import { z } from 'zod';
import { RequestGetAllQuerySchema, ResponseClientSchema } from '../../models';
import { FieldTypeBusinessValueSchema } from '../../models/field-type/field-type-business-value.schema';

const FieldTypeGetAllResponseEntitySchema = z.array(FieldTypeBusinessValueSchema);

const FieldTypeGetAllResponseSchema = z
  .object({
    data: FieldTypeGetAllResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace FieldTypeGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = FieldTypeGetAllResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = FieldTypeGetAllResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
