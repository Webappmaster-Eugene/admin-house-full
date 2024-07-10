import { Workspace } from '.prisma/client';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { OrganizationEntity } from 'src/modules/organization/entities/organization.entity';
import { HandbookEntity } from 'src/modules/handbook/entities/handbook.entity';

export interface WorkspaceRelatedEntities {
  workspaceMembers: UserEntity[];
  organizations: OrganizationEntity[];
  handbookOfWorkspace: HandbookEntity;
  workspaceCreator: UserEntity;
}

export class WorkspaceEntity implements Workspace, WorkspaceRelatedEntities {
  uuid: string;
  name: string;
  description: string;
  workspaceCreatorUuid: string;
  handbookOfWorkspaceUuid: string;
  lastChangeByUserUuid: string;
  createdAt: Date;
  updatedAt: Date;
  workspaceMembers: UserEntity[];
  organizations: OrganizationEntity[];
  handbookOfWorkspace: HandbookEntity;
  workspaceCreator: UserEntity;

  constructor(workspace: Partial<Workspace>) {
    Object.assign(this, workspace);
    return this;
  }
}
