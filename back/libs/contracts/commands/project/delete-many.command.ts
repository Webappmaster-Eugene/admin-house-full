import { z } from 'zod';
import { ProjectSchema } from '../../models';

const ProjectSchemaDeleteManyRequestSchema = ProjectSchema.pick({
  uuid: true,
});

const ProjectSchemaDeleteManyResponseSchema = z.object({
  deletedProjects: z.array(ProjectSchema),
  count: z.number(),
});

export namespace ProjectSchemaDeleteManyCommand {
  export const RequestSchema = ProjectSchemaDeleteManyRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = ProjectSchemaDeleteManyResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
