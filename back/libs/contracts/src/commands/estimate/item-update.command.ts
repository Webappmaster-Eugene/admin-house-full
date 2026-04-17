import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { EstimateItemBusinessValueSchema, EstimateItemSchema } from '../../models/estimate/estimate-item.schema';

const EstimateItemUpdateResponseEntitySchema = EstimateItemBusinessValueSchema;

const EstimateItemUpdateRequestSchema = EstimateItemSchema.pick({
  orderIndex: true,
  itemType: true,
  materialUuid: true,
  name: true,
  unitMeasurement: true,
  quantity: true,
  unitCost: true,
  markupPercent: true,
  comment: true,
}).partial();

const EstimateItemUpdateResponseSchema = z
  .object({
    data: EstimateItemUpdateResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace EstimateItemUpdateCommand {
  export const RequestSchema = EstimateItemUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = EstimateItemUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = EstimateItemUpdateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
