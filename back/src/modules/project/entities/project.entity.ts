import { Project } from '@prisma/client';

export class ProjectEntity implements Project {
  id: number;
  name: string;
  description: string;
  customerId: number;
  organizationId: number;
  responsibleManagerId: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(project: Partial<Project>) {
    Object.assign(this, project);
    return this;
  }
}
