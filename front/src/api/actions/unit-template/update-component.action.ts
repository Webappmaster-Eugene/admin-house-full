'use server';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';
import { UnitTemplateComponentUpdateCommand } from 'src/shared/contracts/unit-template';

export async function updateUnitTemplateComponent(
  workspaceId: string,
  handbookId: string,
  templateId: string,
  componentId: string,
  dto: UnitTemplateComponentUpdateCommand.Request
) {
  return callAction<UnitTemplateComponentUpdateCommand.ResponseEntity>(
    () =>
      axiosInstance.put(
        axiosEndpoints.unit_template.component_update
          .replace(':workspaceId', workspaceId)
          .replace(':handbookId', handbookId)
          .replace(':templateId', templateId)
          .replace(':componentId', componentId),
        dto
      ),
    [`/dashboard/unit-templates/${templateId}/`]
  );
}
