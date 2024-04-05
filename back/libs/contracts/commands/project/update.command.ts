import { z } from 'zod';

const ProjectUpdateRequestSchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
});

const ProjectUpdateResponseSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  organizationUuid: z.string(),
  customerUuid: z.string(),
  responsibleManagerUuid: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export namespace ProjectUpdateCommand {
  export const RequestSchema = ProjectUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = ProjectUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
