import { User, Workspace } from '@prisma/client';

export class WorkspaceEntity implements Workspace {
  id: number;
  name: string;
  description: string;
  handbookOfWorkspaceId: number;
  workspaceCreatorId: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(workspace: Partial<WorkspaceEntity>) {
    Object.assign(this, workspace);
    return this;
  }
}
