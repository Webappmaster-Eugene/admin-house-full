import { EActiveStatuses, Handbook, Organization, User, Workspace } from '.prisma/client';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { OrganizationEntity } from 'src/modules/organization/entities/organization.entity';
import { HandbookEntity } from 'src/modules/handbook/entities/handbook.entity';
import { z } from 'zod';
import { UserBusinessValueSchema } from 'libs/contracts/src/models/user/user-business-value.schema';
import { OrganizationBusinessValueSchema } from 'libs/contracts/src/models/organization/organization-business-value.schema';
import { HandbookBusinessValueSchema } from 'libs/contracts/src/models/handbook/handbook-business-value.schema';

export interface WorkspaceRelatedEntities {
  workspaceMembers: User[];
  organizations: Organization[];
  handbookOfWorkspace: Handbook;
  workspaceCreator: User;
}

export class WorkspaceEntity implements Workspace, WorkspaceRelatedEntities {
  uuid: string;
  name: string;
  description: string;
  workspaceCreatorUuid: string;
  workspaceStatus: EActiveStatuses;
  handbookOfWorkspaceUuid: string;
  lastChangeByUserUuid: string;
  createdAt: Date;
  updatedAt: Date;
  workspaceMembers: User[];
  organizations: Organization[];
  handbookOfWorkspace: Handbook;
  workspaceCreator: User;

  constructor(workspace: Partial<Workspace>) {
    Object.assign(this, workspace);
    return this;
  }
}
