'use server';

import { ProjectUpdateCommand } from '@numart/house-admin-contracts';

import { callAction } from 'src/api/call-action';
import axiosInstance from 'src/api/axios-instance';
import { axiosEndpoints } from 'src/entities/auth/lib';
import { ORGANIZATION_PROJECT_PATHS } from 'src/api/actions/organization/revalidate-paths';

// organizationId — текущая организация проекта (в URL); перенос в другую — через dto.organizationUuid.
export async function updateProject(
  workspaceId: string,
  organizationId: string,
  projectId: string,
  dto: ProjectUpdateCommand.Request
) {
  return callAction<ProjectUpdateCommand.ResponseEntity>(
    () =>
      axiosInstance.put(
        axiosEndpoints.project.update
          .replace(':workspaceId', workspaceId)
          .replace(':organizationId', organizationId)
          .replace(':projectId', projectId),
        dto
      ),
    ORGANIZATION_PROJECT_PATHS
  );
}
