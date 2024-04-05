import { z } from 'zod';

const ProjectGetResponseSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  organizationUuid: z.string(),
  customerUuid: z.string(),
  responsibleManagerUuid: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export namespace ProjectGetCommand {
  export const RequestSchema = ProjectGetResponseSchema;
  export type Request = z.infer<typeof RequestSchema>;
}
