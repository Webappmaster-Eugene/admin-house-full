import { z } from 'zod';
import { MaterialSchema, ResponseClientSchema } from '../../models';
import { MaterialRelatedEntitiesSchema } from '../../models/material/material-related-entities.schema';
import { MaterialBusinessValueSchema } from '../../models/material/material-business-value.schema';

const MaterialCreateResponseEntitySchema = MaterialBusinessValueSchema.merge(MaterialRelatedEntitiesSchema);

const MaterialCreateRequestSchema = MaterialSchema.pick({
  name: true,
  price: true,
  comment: true,
  namePublic: true,
  sourceInfo: true,
  unitMeasurementUuid: true,
  responsiblePartnerUuid: true,
  materialStatus: true,
});

const MaterialCreateResponseSchema = z
  .object({
    data: MaterialCreateResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace MaterialCreateCommand {
  export const RequestSchema = MaterialCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = MaterialCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = MaterialCreateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
