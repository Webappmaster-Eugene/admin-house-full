import { z } from 'zod';
import { MaterialBusinessValueSchema, MaterialRelatedEntitiesSchema, MaterialSchema, RequestGetAllQuerySchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const MaterialGetAllResponseEntitySchema = z.array(MaterialBusinessValueSchema.merge(MaterialRelatedEntitiesSchema.strict()));

const MaterialGetAllResponseSchema = z
  .object({
    data: MaterialGetAllResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace MaterialGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = MaterialGetAllResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = MaterialGetAllResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
