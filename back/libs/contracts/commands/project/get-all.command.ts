import { z } from 'zod';
import { ProjectSchema } from '../../models';

const ProjectGetAllResponseSchema = z.array(ProjectSchema);

export namespace ProjectGetAllCommand {
  export const ResponseSchema = ProjectGetAllResponseSchema;
  export type Request = z.infer<typeof ResponseSchema>;
}
