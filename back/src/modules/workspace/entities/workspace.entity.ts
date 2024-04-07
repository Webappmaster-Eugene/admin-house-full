import { EUserTypeVariants, Workspace } from '@prisma/client';

export class WorkspaceEntity implements Workspace {
  uuid: string;
  idWorkspace: number;
  name: EUserTypeVariants;
  description: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(workspace: Partial<Workspace>) {
    Object.assign(this, workspace);
    return this;
  }
}
