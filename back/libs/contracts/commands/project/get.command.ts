import { z } from 'zod';
import { ProjectSchema } from '../../models';

const ProjectSchemaGetRequestSchema = ProjectSchema.pick({
  uuid: true,
});

const ProjectSchemaGetResponseSchema = ProjectSchema;

export namespace ProjectGetCommand {
  export const RequestSchema = ProjectSchemaGetRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = ProjectSchemaGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
