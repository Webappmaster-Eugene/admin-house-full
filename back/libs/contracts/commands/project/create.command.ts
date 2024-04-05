import { z } from 'zod';

const ProjectCreateRequestSchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
  customerUuid: z.string(),
  organizationUuid: z.string(),
});

const ProjectCreateResponseSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  organizationUuid: z.string(),
  customerUuid: z.string(),
  responsibleManagerUuid: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export namespace ProjectCreateCommand {
  export const RequestSchema = ProjectCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = ProjectCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
