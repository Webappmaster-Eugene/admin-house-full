'use server';

import { ProjectCreateCommand } from '@numart/house-admin-contracts';

import { callAction } from 'src/api/call-action';
import axiosInstance from 'src/api/axios-instance';
import { axiosEndpoints } from 'src/entities/auth/lib';
import { ORGANIZATION_PROJECT_PATHS } from 'src/api/actions/organization/revalidate-paths';

export async function createProject(
  workspaceId: string,
  organizationId: string,
  dto: ProjectCreateCommand.Request
) {
  return callAction<ProjectCreateCommand.ResponseEntity>(
    () =>
      axiosInstance.post(
        axiosEndpoints.project.create
          .replace(':workspaceId', workspaceId)
          .replace(':organizationId', organizationId),
        dto
      ),
    ORGANIZATION_PROJECT_PATHS
  );
}
