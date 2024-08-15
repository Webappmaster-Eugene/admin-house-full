import { ProjectSchema } from './project.schema';

export const ProjectBusinessValueSchema = ProjectSchema.pick({
  name: true,
  description: true,
  customerMail: true,
  customerUuid: true,
  createdAt: true,
  updatedAt: true,
  uuid: true,
  projectStatus: true,
  responsibleManagerUuid: true,
  organizationUuid: true,
  lastChangeByUserUuid: true,
});
