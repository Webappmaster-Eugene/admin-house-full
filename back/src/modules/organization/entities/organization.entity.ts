import { Organization } from '.prisma/client';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { ProjectEntity } from 'src/modules/project/entities/project.entity';
import { WorkspaceEntity } from 'src/modules/workspace/entities/workspace.entity';

export interface OrganizationRelatedEntities {
  organizationLeader?: UserEntity;
  organizationMembers?: UserEntity[];
  projects?: ProjectEntity[];
  workspace?: WorkspaceEntity;
}

export class OrganizationEntity implements Organization, OrganizationRelatedEntities {
  uuid: string;
  name: string;
  workspaceUuid: string;
  organizationLeaderUuid: string;
  description: string;
  lastChangeByUserUuid: string;
  createdAt: Date;
  updatedAt: Date;
  organizationLeader?: UserEntity;
  organizationMembers?: UserEntity[];
  projects?: ProjectEntity[];
  workspace?: WorkspaceEntity;

  constructor(organization: Partial<Organization>) {
    Object.assign(this, organization);
    return this;
  }
}
