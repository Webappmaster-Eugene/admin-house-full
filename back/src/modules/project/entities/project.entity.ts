import { EActiveStatuses, Organization, Project, User } from '.prisma/client';
import { OrganizationEntity } from 'src/modules/organization/entities/organization.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';

export interface ProjectRelatedEntities {
  organization: Organization;
  projectMembers: User[];
  customer: User;
  responsibleManager: User;
}

export class ProjectEntity implements Project, ProjectRelatedEntities {
  uuid: string;
  name: string;
  description: string;
  projectStatus: EActiveStatuses;
  customerUuid: string;
  customerMail: string;
  organizationUuid: string;
  responsibleManagerUuid: string;
  lastChangeByUserUuid: string;
  createdAt: Date;
  updatedAt: Date;
  organization: Organization;
  projectMembers: User[];
  customer: User;
  responsibleManager: User;

  constructor(project: Partial<Project>) {
    Object.assign(this, project);
    return this;
  }
}
