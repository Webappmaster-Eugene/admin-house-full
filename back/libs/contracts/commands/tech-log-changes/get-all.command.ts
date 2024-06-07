import { z } from 'zod';
import { RequestGetAllQuerySchema, TechLogChangesSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const TechLogChangesGetAllResponseSchema = z
  .object({
    data: z.array(
      TechLogChangesSchema.pick({
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
    ),
  })
  .merge(ResponseClientSchema);

export namespace TechLogChangesGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = TechLogChangesGetAllResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
