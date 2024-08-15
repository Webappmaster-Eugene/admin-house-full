import { z } from 'zod';
import { ProjectBusinessValueSchema } from '../../../models/project/project-business-value.schema';

export const UserMemberOfProjectsSchema = z.object({
  memberOfProjects: z.array(ProjectBusinessValueSchema).nullable().optional(),
});
