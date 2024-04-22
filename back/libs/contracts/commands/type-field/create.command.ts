import { z } from 'zod';
import { TypeFieldSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const TypeFieldCreateRequestSchema = TypeFieldSchema.omit({
  uuid: true,
  createdAt: true,
  updatedAt: true,
});

const TypeFieldCreateResponseSchema = z
  .object({
    data: TypeFieldSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace TypeFieldCreateCommand {
  export const RequestSchema = TypeFieldCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = TypeFieldCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
