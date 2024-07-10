import { Role, User, Workspace } from '.prisma/client';
import { RoleEntity } from 'src/modules/roles/entities/role.entity';
import { WorkspaceEntity } from 'src/modules/workspace/entities/workspace.entity';

export interface UserRelatedEntities {
  // roleName?: string;
  role: RoleEntity;
  creatorOfWorkspace: WorkspaceEntity;
  memberOfWorkspace: WorkspaceEntity;
}

export class UserEntity implements User, UserRelatedEntities {
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

  constructor(user: Partial<User>) {
    Object.assign(this, user);
    return this;
  }
}
