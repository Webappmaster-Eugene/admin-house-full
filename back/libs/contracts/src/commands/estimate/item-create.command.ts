import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { EstimateItemBusinessValueSchema, EstimateItemSchema } from '../../models/estimate/estimate-item.schema';

const EstimateItemCreateResponseEntitySchema = EstimateItemBusinessValueSchema;

const EstimateItemCreateRequestSchema = EstimateItemSchema.pick({
  orderIndex: true,
  itemType: true,
  materialUuid: true,
  unitTemplateUuid: true,
  name: true,
  unitMeasurement: true,
  quantity: true,
  unitCost: true,
  markupPercent: true,
  comment: true,
}).partial({
  materialUuid: true,
  unitTemplateUuid: true,
  name: true,
  unitMeasurement: true,
  unitCost: true,
  markupPercent: true,
  comment: true,
});

const EstimateItemCreateResponseSchema = z
  .object({
    data: EstimateItemCreateResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace EstimateItemCreateCommand {
  export const RequestSchema = EstimateItemCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = EstimateItemCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = EstimateItemCreateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
