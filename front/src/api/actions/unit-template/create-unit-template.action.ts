'use server';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';
import { UnitTemplateCreateCommand } from 'src/shared/contracts/unit-template';

export async function createUnitTemplate(
  workspaceId: string,
  handbookId: string,
  dto: UnitTemplateCreateCommand.Request
) {
  return callAction<UnitTemplateCreateCommand.ResponseEntity>(
    () =>
      axiosInstance.post(
        axiosEndpoints.unit_template.create
          .replace(':workspaceId', workspaceId)
          .replace(':handbookId', handbookId),
        dto
      ),
    ['/dashboard/unit-templates/']
  );
}
