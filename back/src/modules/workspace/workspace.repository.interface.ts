import { WorkspaceRequestDto, WorkspaceResponseDto } from './dto/workspace.dto';

export interface WorkspaceServiceInterface {
  getAllWorkspaces: () => Promise<WorkspaceResponseDto[]>;
  getWorkspaceById: (id: number) => Promise<WorkspaceResponseDto>;
  createWorkspaceByUserId: (
    body: WorkspaceRequestDto,
    id: number,
  ) => Promise<WorkspaceResponseDto>;
  updateWorkspaceById: (
    body: WorkspaceRequestDto,
    id: number,
  ) => Promise<WorkspaceResponseDto>;
  deleteWorkspaceById: (id: number) => Promise<WorkspaceResponseDto>;
  changeWorkspaceOwner: (
    id: number,
    newOwnerId: number,
  ) => Promise<WorkspaceResponseDto>;
}
