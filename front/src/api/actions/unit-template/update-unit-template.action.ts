'use server';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';
import { UnitTemplateUpdateCommand } from 'src/shared/contracts/unit-template';

export async function updateUnitTemplate(
  workspaceId: string,
  handbookId: string,
  templateId: string,
  dto: UnitTemplateUpdateCommand.Request
) {
  return callAction<UnitTemplateUpdateCommand.ResponseEntity>(
    () =>
      axiosInstance.put(
        axiosEndpoints.unit_template.update
          .replace(':workspaceId', workspaceId)
          .replace(':handbookId', handbookId)
          .replace(':templateId', templateId),
        dto
      ),
    [`/dashboard/unit-templates/${templateId}/`, '/dashboard/unit-templates/']
  );
}
