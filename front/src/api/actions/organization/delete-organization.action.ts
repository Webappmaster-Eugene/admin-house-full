'use server';

import { OrganizationDeleteCommand } from '@numart/house-admin-contracts';

import { callAction } from 'src/api/call-action';
import axiosInstance from 'src/api/axios-instance';
import { axiosEndpoints } from 'src/entities/auth/lib';

import { ORGANIZATION_PROJECT_PATHS } from './revalidate-paths';

// Бэкенд удаляет организацию каскадно — вместе с её проектами и их сметами.
export async function deleteOrganization(workspaceId: string, organizationId: string) {
  return callAction<OrganizationDeleteCommand.ResponseEntity>(
    () =>
      axiosInstance.delete(
        axiosEndpoints.organization.delete
          .replace(':workspaceId', workspaceId)
          .replace(':organizationId', organizationId)
      ),
    ORGANIZATION_PROJECT_PATHS
  );
}
