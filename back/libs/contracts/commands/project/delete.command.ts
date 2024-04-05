import { z } from 'zod';

const ProjectDeleteResponseSchema = z.object({
  count: z.number(),
});

export namespace ProjectDeleteCommand {
  export const ResponseSchema = ProjectDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
