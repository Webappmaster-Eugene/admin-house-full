'use server';

import { ProjectDeleteCommand } from '@numart/house-admin-contracts';

import { callAction } from 'src/api/call-action';
import axiosInstance from 'src/api/axios-instance';
import { axiosEndpoints } from 'src/entities/auth/lib';
import { ORGANIZATION_PROJECT_PATHS } from 'src/api/actions/organization/revalidate-paths';

// Бэкенд удаляет проект каскадно — вместе со всеми его сметами.
export async function deleteProject(
  workspaceId: string,
  organizationId: string,
  projectId: string
) {
  return callAction<ProjectDeleteCommand.ResponseEntity>(
    () =>
      axiosInstance.delete(
        axiosEndpoints.project.delete
          .replace(':workspaceId', workspaceId)
          .replace(':organizationId', organizationId)
          .replace(':projectId', projectId)
      ),
    ORGANIZATION_PROJECT_PATHS
  );
}
