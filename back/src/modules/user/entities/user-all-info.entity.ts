import { Handbook, Organization, Project, Role, User, Workspace } from '.prisma/client';
import { RoleEntity } from 'src/modules/roles/entities/role.entity';
import { WorkspaceEntity } from 'src/modules/workspace/entities/workspace.entity';
import { OrganizationEntity } from 'src/modules/organization/entities/organization.entity';
import { ProjectEntity } from 'src/modules/project/entities/project.entity';
import { HandbookEntity } from 'src/modules/handbook/entities/handbook.entity';

export interface UserAllInfoRelatedEntities {
  // roleName?: string;
  role: RoleEntity;
  creatorOfWorkspace: WorkspaceEntity;
  memberOfWorkspace: WorkspaceEntity;
  memberOfOrganization: OrganizationEntity;
  leaderOfOrganizations: OrganizationEntity[];
  memberOfProject: ProjectEntity;
  responsibleManagerOfProjects: ProjectEntity[];
  handbookManager: HandbookEntity;
}

export class UserAllInfoEntity implements User, UserAllInfoRelatedEntities {
  uuid: string;
  firstName: string;
  secondName: string;
  phone: string;
  email: string;
  password: string;
  address: string;
  info: string;
  roleUuid: string;
  avatar: string;
  documents: string;
  creatorOfWorkspaceUuid: string;
  memberOfWorkspaceUuid: string;
  memberOfOrganizationUuid: string;
  memberOfProjectUuid: string;
  handbookManagerUuid: string;
  lastChangeByUserUuid: string;
  createdAt: Date;
  updatedAt: Date;
  // roleName?: string;
  role: RoleEntity;
  creatorOfWorkspace: WorkspaceEntity;
  memberOfWorkspace: WorkspaceEntity;
  memberOfOrganization: OrganizationEntity;
  leaderOfOrganizations: OrganizationEntity[];
  memberOfProject: ProjectEntity;
  responsibleManagerOfProjects: ProjectEntity[];
  handbookManager: HandbookEntity;

  constructor(user: Partial<User>) {
    Object.assign(this, user);
    return this;
  }
}
