import { z } from 'zod';
import { ProjectSchema } from '../../models';

const ProjectCreateRequestSchema = ProjectSchema.pick({
  name: true,
  description: true,
  customerMail: true,
});

const ProjectCreateResponseSchema = ProjectSchema;

export namespace ProjectCreateCommand {
  export const RequestSchema = ProjectCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = ProjectCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
