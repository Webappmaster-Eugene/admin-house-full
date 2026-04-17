'use server';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';
import { UnitTemplateComponentDeleteCommand } from 'src/shared/contracts/unit-template';

export async function deleteUnitTemplateComponent(
  workspaceId: string,
  handbookId: string,
  templateId: string,
  componentId: string
) {
  return callAction<UnitTemplateComponentDeleteCommand.ResponseEntity>(
    () =>
      axiosInstance.delete(
        axiosEndpoints.unit_template.component_delete
          .replace(':workspaceId', workspaceId)
          .replace(':handbookId', handbookId)
          .replace(':templateId', templateId)
          .replace(':componentId', componentId)
      ),
    [`/dashboard/unit-templates/${templateId}/`]
  );
}
