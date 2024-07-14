import { z } from 'zod';
import { RequestGetAllQuerySchema, ResponseClientSchema } from '../../models';
import { TechLogChangesBusinessValueSchema } from '../../models/tech-log-changes/tech-log-changes-business-value.schema';

const TechLogChangesGetAllResponseEntitySchema = z.array(TechLogChangesBusinessValueSchema);

const TechLogChangesGetAllResponseSchema = z
  .object({
    data: TechLogChangesGetAllResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace TechLogChangesGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = TechLogChangesGetAllResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = TechLogChangesGetAllResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
