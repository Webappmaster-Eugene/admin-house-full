import { WorkspaceSchema } from './workspace.schema';

export const WorkspaceBusinessValueSchema = WorkspaceSchema.pick({
  uuid: true,
  name: true,
  description: true,
  workspaceStatus: true,
  workspaceCreatorUuid: true,
  handbookOfWorkspaceUuid: true,
});
