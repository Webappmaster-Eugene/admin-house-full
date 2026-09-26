'use server';

import { OrganizationCreateCommand } from '@numart/house-admin-contracts';

import { callAction } from 'src/api/call-action';
import axiosInstance from 'src/api/axios-instance';
import { axiosEndpoints } from 'src/entities/auth/lib';

import { ORGANIZATION_PROJECT_PATHS } from './revalidate-paths';

export async function createOrganization(
  workspaceId: string,
  dto: OrganizationCreateCommand.Request
) {
  return callAction<OrganizationCreateCommand.ResponseEntity>(
    () =>
      axiosInstance.post(
        axiosEndpoints.organization.create.replace(':workspaceId', workspaceId),
        dto
      ),
    ORGANIZATION_PROJECT_PATHS
  );
}
