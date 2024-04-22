import { z } from 'zod';
import { MaterialSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const MaterialCreateRequestSchema = MaterialSchema.omit({
  uuid: true,
  createdAt: true,
  updatedAt: true,
});

const MaterialCreateResponseSchema = z
  .object({
    data: MaterialSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace MaterialCreateCommand {
  export const RequestSchema = MaterialCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = MaterialCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
