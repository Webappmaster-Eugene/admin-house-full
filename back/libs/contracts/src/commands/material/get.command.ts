import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { MaterialBusinessValueSchema } from '../../models/material/material-business-value.schema';
import { MaterialRelatedEntitiesSchema } from '../../models/material/material-related-entities.schema';

const MaterialGetResponseEntitySchema = MaterialBusinessValueSchema.merge(MaterialRelatedEntitiesSchema);

const MaterialGetResponseSchema = z
  .object({
    data: MaterialGetResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace MaterialGetCommand {
  export const ResponseSchema = MaterialGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = MaterialGetResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
