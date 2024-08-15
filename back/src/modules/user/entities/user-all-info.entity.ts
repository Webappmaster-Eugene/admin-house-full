import { EActiveStatuses, Handbook, Organization, Project, Role, User, Workspace } from '.prisma/client';
import { RoleEntity } from 'src/modules/roles/entities/role.entity';
import { WorkspaceEntity } from 'src/modules/workspace/entities/workspace.entity';
import { OrganizationEntity } from 'src/modules/organization/entities/organization.entity';
import { ProjectEntity } from 'src/modules/project/entities/project.entity';
import { HandbookEntity } from 'src/modules/handbook/entities/handbook.entity';

export interface UserAllInfoRelatedEntities {
  roles: Role[];
  customerOfProjects: Project[];
  handbookManager: Handbook;
  responsibleManagerOfProjects: Project[];
  creatorOfWorkspace: Workspace;
  leaderOfOrganizations: Organization[];
  memberOfWorkspaces: Workspace[];
  memberOfOrganizations: Organization[];
  memberOfProjects: Project[];
}

export class UserAllInfoEntity implements User, UserAllInfoRelatedEntities {
  uuid: string;
  firstName: string;
  secondName: string;
  userStatus: EActiveStatuses;
  phone: string;
  email: string;
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
  memberOfOrganizations: Organization[];
  memberOfProjects: Project[];

  constructor(user: Partial<User>) {
    Object.assign(this, user);
    return this;
  }
}
