import { z } from 'zod';
import { MaterialSchema, ResponseClientSchema } from '../../models';
import { MaterialBusinessValueSchema } from '../../models/material/material-business-value.schema';
import { MaterialRelatedEntitiesSchema } from '../../models/material/material-related-entities.schema';

const MaterialUpdateCategoryResponseEntitySchema = MaterialBusinessValueSchema.merge(MaterialRelatedEntitiesSchema);

const MaterialUpdateCategoryRequestSchema = MaterialSchema.pick({
  categoryMaterialUuid: true,
});

const MaterialUpdateCategoryResponseSchema = z
  .object({
    data: MaterialUpdateCategoryResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace MaterialUpdateCategoryCommand {
  export const RequestSchema = MaterialUpdateCategoryRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = MaterialUpdateCategoryResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = MaterialUpdateCategoryResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
