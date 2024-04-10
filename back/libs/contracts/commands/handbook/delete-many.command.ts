import { z } from 'zod';
import { HandbookSchema } from '../../models';

const HandbookDeleteManyRequestSchema = HandbookSchema.pick({
  uuid: true,
});

const HandbookDeleteManyResponseSchema = z.object({
  deletedWorkspace: z.array(HandbookSchema),
  count: z.number(),
});

export namespace HandbookDeleteManyCommand {
  export const RequestSchema = HandbookDeleteManyRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = HandbookDeleteManyResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
