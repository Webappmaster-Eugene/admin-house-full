import { z } from 'zod';

const OrganizationDeleteResponseSchema = z.object({
  count: z.number(),
});

export namespace OrganizationDeleteCommand {
  export const ResponseSchema = OrganizationDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
