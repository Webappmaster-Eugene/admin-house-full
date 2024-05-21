import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { FieldVariantsForSelectorFieldTypeSchema } from '../../models';

const FieldVariantsForSelectorFieldTypeCreateRequestSchema = FieldVariantsForSelectorFieldTypeSchema.omit({
  uuid: true,
  createdAt: true,
  updatedAt: true,
  characteristicsMaterialUuid: true,
  handbookUuid: true,
});

const FieldVariantsForSelectorFieldTypeCreateResponseSchema = z
  .object({
    data: FieldVariantsForSelectorFieldTypeSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace FieldVariantsForSelectorFieldTypeCreateCommand {
  export const RequestSchema = FieldVariantsForSelectorFieldTypeCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = FieldVariantsForSelectorFieldTypeCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
