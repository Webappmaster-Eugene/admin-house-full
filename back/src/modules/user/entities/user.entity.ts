import { EActiveStatuses, Handbook, Organization, Project, Role, User, Workspace } from '.prisma/client';
import { RoleEntity } from 'src/modules/roles/entities/role.entity';
import { WorkspaceEntity } from 'src/modules/workspace/entities/workspace.entity';
import { z } from 'zod';
import { RoleBusinessValueSchema } from 'libs/contracts/src/models/role/role-business-value.schema';
import { ProjectBusinessValueSchema } from 'libs/contracts/src/models/project/project-business-value.schema';
import { HandbookBusinessValueSchema } from 'libs/contracts/src/models/handbook/handbook-business-value.schema';
import { WorkspaceBusinessValueSchema } from 'libs/contracts/src/models/workspace/workspace-business-value.schema';
import { OrganizationBusinessValueSchema } from 'libs/contracts/src/models/organization/organization-business-value.schema';

export interface UserRelatedEntities {
  roles: Role[];
  customerOfProjects: Project[];
  handbookManager: Handbook;
  responsibleManagerOfProjects: Project[];
  creatorOfWorkspace: Workspace;
  leaderOfOrganizations: Organization[];
  memberOfWorkspaces: Workspace[];
  membersOfOrganizations: Organization[];
  membersOfProjects: Project[];
}

export class UserEntity implements User, UserRelatedEntities {
  uuid: string;
  firstName: string;
  secondName: string;
  phone: string;
  email: string;
  userStatus: EActiveStatuses;
  password: string;
  address: string;
  info: string;
  avatar: string;
  documents: string;
  creatorOfWorkspaceUuid: string;
  handbookManagerUuid: string;
  lastChangeByUserUuid: string;
  createdAt: Date;
  updatedAt: Date;
  roles: Role[];
  customerOfProjects: Project[];
  handbookManager: Handbook;
  responsibleManagerOfProjects: Project[];
  creatorOfWorkspace: Workspace;
  leaderOfOrganizations: Organization[];
  memberOfWorkspaces: Workspace[];
  membersOfOrganizations: Organization[];
  membersOfProjects: Project[];

  constructor(user: Partial<User>) {
    Object.assign(this, user);
    return this;
  }
}
