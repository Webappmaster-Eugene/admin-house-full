import { z } from 'zod';
import { RequestGetAllQuerySchema, ResponseClientSchema } from '../../models';
import { MaterialBusinessValueSchema } from '../../models/material/material-business-value.schema';
import { MaterialRelatedEntitiesSchema } from '../../models/material/material-related-entities.schema';

const MaterialGetAllResponseEntitySchema = z.array(MaterialBusinessValueSchema.merge(MaterialRelatedEntitiesSchema));

const MaterialGetAllResponseSchema = z
  .object({
    data: MaterialGetAllResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace MaterialGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = MaterialGetAllResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = MaterialGetAllResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
