'use server';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';
import { UnitTemplateDeleteCommand } from 'src/shared/contracts/unit-template';

export async function deleteUnitTemplate(
  workspaceId: string,
  handbookId: string,
  templateId: string
) {
  return callAction<UnitTemplateDeleteCommand.ResponseEntity>(
    () =>
      axiosInstance.delete(
        axiosEndpoints.unit_template.delete
          .replace(':workspaceId', workspaceId)
          .replace(':handbookId', handbookId)
          .replace(':templateId', templateId)
      ),
    ['/dashboard/unit-templates/']
  );
}
