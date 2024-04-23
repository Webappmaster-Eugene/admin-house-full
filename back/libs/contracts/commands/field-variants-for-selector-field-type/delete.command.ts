import { z } from 'zod';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { ResponseClientSchema } from '../../models';
import { FieldVariantsForSelectorFieldTypeSchema } from '../../models/field-variants-for-selector-field-type';

const FieldVariantsForSelectorFieldTypeDeleteResponseSchema = z
  .object({
    data: FieldVariantsForSelectorFieldTypeSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace FieldVariantsForSelectorFieldTypeDeleteCommand {
  export const RequestParamSchema =
    EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema =
    FieldVariantsForSelectorFieldTypeDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
