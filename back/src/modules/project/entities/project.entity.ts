import { Project } from '.prisma/client';

export class ProjectEntity implements Project {
  uuid: string;
  name: string;
  description: string;
  customerUuid: string;
  customerMail: string;
  organizationUuid: string;
  responsibleManagerUuid: string;
  lastChangeByUserUuid: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(project: Partial<Project>) {
    Object.assign(this, project);
    return this;
  }
}
