'use server';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';
import { UnitTemplateComponentCreateCommand } from 'src/shared/contracts/unit-template';

export async function createUnitTemplateComponent(
  workspaceId: string,
  handbookId: string,
  templateId: string,
  dto: UnitTemplateComponentCreateCommand.Request
) {
  return callAction<UnitTemplateComponentCreateCommand.ResponseEntity>(
    () =>
      axiosInstance.post(
        axiosEndpoints.unit_template.component_create
          .replace(':workspaceId', workspaceId)
          .replace(':handbookId', handbookId)
          .replace(':templateId', templateId),
        dto
      ),
    [`/dashboard/unit-templates/${templateId}/`]
  );
}
