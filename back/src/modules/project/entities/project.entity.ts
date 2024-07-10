import { Project } from '.prisma/client';
import { OrganizationEntity } from 'src/modules/organization/entities/organization.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';

export interface ProjectRelatedEntities {
  organization: OrganizationEntity;
  projectMembers: UserEntity[];
  customer: UserEntity;
  responsibleManager: UserEntity;
}

export class ProjectEntity implements Project, ProjectRelatedEntities {
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
  organization: OrganizationEntity;
  projectMembers: UserEntity[];
  customer: UserEntity;
  responsibleManager: UserEntity;

  constructor(project: Partial<Project>) {
    Object.assign(this, project);
    return this;
  }
}
