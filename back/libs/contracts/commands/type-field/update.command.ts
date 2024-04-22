import { z } from 'zod';
import { TypeFieldSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const TypeFieldUpdateRequestSchema = TypeFieldSchema.omit({
  createdAt: true,
  updatedAt: true,
  uuid: true,
}).partial();

const TypeFieldUpdateResponseSchema = z
  .object({
    data: TypeFieldSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace TypeFieldUpdateCommand {
  export const RequestSchema = TypeFieldUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = TypeFieldUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
