import { z } from 'zod';
import { EntityUrlParamCommand } from '../common';
import { ResponseClientSchema } from '../../models';
import { FieldVariantsForSelectorFieldTypeSchema } from '../../models';

const FieldVariantsForSelectorFieldTypeDeleteResponseSchema = z
  .object({
    data: FieldVariantsForSelectorFieldTypeSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace FieldVariantsForSelectorFieldTypeDeleteCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = FieldVariantsForSelectorFieldTypeDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
