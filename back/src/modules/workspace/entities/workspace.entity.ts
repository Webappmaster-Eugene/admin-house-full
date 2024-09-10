import { EActiveStatuses, Handbook, Organization, User, Workspace } from '.prisma/client';

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
