import { EUserTypeVariants, Project } from '@prisma/client';

export class ProjectEntity implements Project {
  uuid: string;
  idProject: number;
  name: EUserTypeVariants;
  description: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(project: Partial<Project>) {
    Object.assign(this, project);
    return this;
  }
}
