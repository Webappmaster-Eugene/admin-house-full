import { EUserTypeVariants, Workspace } from '.prisma/client';

export class WorkspaceEntity implements Workspace {
  uuid: string;
  name: string;
  description: string;
  workspaceCreatorUuid: string;
  handbookOfWorkspaceUuid: string;
  lastChangeByUserUuid: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(workspace: Partial<Workspace>) {
    Object.assign(this, workspace);
    return this;
  }
}
