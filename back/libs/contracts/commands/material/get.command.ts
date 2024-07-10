import { z } from 'zod';
import { MaterialBusinessValueSchema, MaterialRelatedEntitiesSchema, MaterialSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const MaterialGetResponseEntitySchema = MaterialBusinessValueSchema.merge(MaterialRelatedEntitiesSchema.strict());

const MaterialGetResponseSchema = z
  .object({
    data: MaterialGetResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace MaterialGetCommand {
  export const ResponseSchema = MaterialGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = MaterialGetResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
