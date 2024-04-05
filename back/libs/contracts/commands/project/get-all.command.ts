import { z } from 'zod';

const ProjectGetAllResponseSchema = z.array(
  z.object({
    uuid: z.string().uuid(),
    name: z.string(),
    description: z.string().nullable(),
    organizationUuid: z.string(),
    customerUuid: z.string(),
    responsibleManagerUuid: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
  }),
);

export namespace ProjectGetAllCommand {
  export const RequestSchema = ProjectGetAllResponseSchema;
  export type Request = z.infer<typeof RequestSchema>;
}
