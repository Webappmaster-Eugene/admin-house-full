import { z } from 'zod';
import { MaterialSchema, ResponseClientSchema } from '../../models';
import { MaterialBusinessValueSchema } from '../../models/material/material-business-value.schema';
import { MaterialRelatedEntitiesSchema } from '../../models/material/material-related-entities.schema';

const MaterialUpdateResponseEntitySchema = MaterialBusinessValueSchema.merge(MaterialRelatedEntitiesSchema);

const MaterialUpdateRequestSchema = MaterialSchema.pick({
  name: true,
  price: true,
  comment: true,
  namePublic: true,
  sourceInfo: true,
  unitMeasurementUuid: true,
  responsiblePartnerUuid: true,
  materialStatus: true,
}).partial();

const MaterialUpdateResponseSchema = z
  .object({
    data: MaterialUpdateResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace MaterialUpdateCommand {
  export const RequestSchema = MaterialUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = MaterialUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = MaterialUpdateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
