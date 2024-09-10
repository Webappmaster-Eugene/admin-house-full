import { EActiveStatuses, Handbook, Organization, Project, Role, User, Workspace } from '.prisma/client';

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
