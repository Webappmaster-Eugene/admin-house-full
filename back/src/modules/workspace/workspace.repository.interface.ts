import { WorkspaceRequestDto } from './dto/workspace.dto';
import { WorkspaceEntity } from './entities/workspace.entity';

export interface WorkspaceServiceInterface {
  getAllWorkspaces: () => Promise<WorkspaceEntity[]>;
  getWorkspaceById: (id: number) => Promise<WorkspaceEntity>;
  getWorkspaceByManagerId: (managerId: number) => Promise<WorkspaceEntity>;
  createWorkspaceByUserId: (
    body: WorkspaceRequestDto,
    userId: number,
  ) => Promise<WorkspaceEntity>;
  updateWorkspaceById: (
    body: WorkspaceRequestDto,
    id: number,
  ) => Promise<WorkspaceEntity>;
  deleteWorkspaceById: (id: number) => Promise<WorkspaceEntity>;
  changeWorkspaceOwner: (
    id: number,
    newOwnerId: number,
  ) => Promise<WorkspaceEntity>;
}
