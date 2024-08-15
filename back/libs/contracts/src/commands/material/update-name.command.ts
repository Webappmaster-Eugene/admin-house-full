import { z } from 'zod';
import { MaterialSchema, ResponseClientSchema } from '../../models';
import { MaterialBusinessValueSchema } from '../../models/material/material-business-value.schema';
import { MaterialRelatedEntitiesSchema } from '../../models/material/material-related-entities.schema';

const MaterialUpdateNameResponseEntitySchema = MaterialBusinessValueSchema.merge(MaterialRelatedEntitiesSchema);

const MaterialUpdateNameRequestSchema = MaterialSchema.pick({
  name: true,
});

const MaterialUpdateNameResponseSchema = z
  .object({
    data: MaterialUpdateNameResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace MaterialUpdateNameCommand {
  export const RequestSchema = MaterialUpdateNameRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = MaterialUpdateNameResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = MaterialUpdateNameResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
