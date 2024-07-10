import { z } from 'zod';
import { RequestGetAllQuerySchema, TechLogChangesBusinessValueSchema, TechLogChangesSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const TechLogChangesGetAllResponseEntitySchema = z.array(TechLogChangesBusinessValueSchema);

const TechLogChangesGetAllResponseSchema = z
  .object({
    data: TechLogChangesGetAllResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace TechLogChangesGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = TechLogChangesGetAllResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = TechLogChangesGetAllResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
