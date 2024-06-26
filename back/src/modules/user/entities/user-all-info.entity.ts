import { Handbook, Organization, Project, Role, User, Workspace } from '.prisma/client';
import { RoleSchema, WorkspaceSchema } from '@numart/house-admin-contracts';

// class PersonWithRoleName {
//   public roleName: string;
// }

// export class UserAllInfoEntity extends PersonWithRoleName implements User {
export class UserAllInfoEntity implements User {
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
  roleName?: string;
  role?: Role;
  creatorOfWorkspace?: Workspace;
  memberOfWorkspace?: Workspace;
  memberOfOrganization?: Organization;
  leaderOfOrganizations?: Organization[];
  memberOfProject?: Project;
  responsibleManagerOfProjects?: Project[];
  handbookManager?: Handbook;

  constructor(user: Partial<User>) {
    Object.assign(this, user);
    return this;
  }
}
