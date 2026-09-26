'use server';

import { OrganizationUpdateCommand } from '@numart/house-admin-contracts';

import { callAction } from 'src/api/call-action';
import axiosInstance from 'src/api/axios-instance';
import { axiosEndpoints } from 'src/entities/auth/lib';

import { ORGANIZATION_PROJECT_PATHS } from './revalidate-paths';

export async function updateOrganization(
  workspaceId: string,
  organizationId: string,
  dto: OrganizationUpdateCommand.Request
) {
  return callAction<OrganizationUpdateCommand.ResponseEntity>(
    () =>
      axiosInstance.put(
        axiosEndpoints.organization.update
          .replace(':workspaceId', workspaceId)
          .replace(':organizationId', organizationId),
        dto
      ),
    ORGANIZATION_PROJECT_PATHS
  );
}
