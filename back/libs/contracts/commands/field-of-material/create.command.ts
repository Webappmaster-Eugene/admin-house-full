import { z } from 'zod';
import { FieldOfMaterialSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const FieldOfMaterialCreateRequestSchema = FieldOfMaterialSchema.omit({
  uuid: true,
  createdByUuid: true,

  createdAt: true,
  updatedAt: true,
});

const FieldOfMaterialCreateResponseSchema = z
  .object({
    data: FieldOfMaterialSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace FieldOfMaterialCreateCommand {
  export const RequestSchema = FieldOfMaterialCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = FieldOfMaterialCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
