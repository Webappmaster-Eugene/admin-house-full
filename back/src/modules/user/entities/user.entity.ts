import { EActiveStatuses, Handbook, Organization, Project, Role, User, Workspace } from '.prisma/client';

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
