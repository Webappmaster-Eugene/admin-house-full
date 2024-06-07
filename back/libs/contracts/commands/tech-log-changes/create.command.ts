import { z } from 'zod';
import { TechLogChangesSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const TechLogChangesCreateRequestSchema = TechLogChangesSchema.pick({
  updateInfo: true,
  action: true,
  oldInfo: true,
  newInfo: true,
  name: true,
  comment: true,
});

const TechLogChangesCreateResponseSchema = z
  .object({
    data: TechLogChangesSchema.pick({
      name: true,
      entity: true,
      comment: true,
      oldInfo: true,
      newInfo: true,
      updateInfo: true,
      action: true,
      uuid: true,
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace TechLogChangesCreateCommand {
  export const RequestSchema = TechLogChangesCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = TechLogChangesCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
