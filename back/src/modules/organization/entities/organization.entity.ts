import { EActiveStatuses, Organization, Project, User, Workspace } from '.prisma/client';

export interface OrganizationRelatedEntities {
  organizationLeader: User;
  organizationMembers: User[];
  projects: Project[];
  workspace?: Workspace;
}

export class OrganizationEntity implements Organization, OrganizationRelatedEntities {
  uuid: string;
  name: string;
  organizationStatus: EActiveStatuses;
  workspaceUuid: string;
  organizationLeaderUuid: string;
  description: string;
  lastChangeByUserUuid: string;
  createdAt: Date;
  updatedAt: Date;
  organizationLeader: User;
  organizationMembers: User[];
  projects: Project[];
  workspace?: Workspace;

  constructor(organization: Partial<Organization>) {
    Object.assign(this, organization);
    return this;
  }
}
