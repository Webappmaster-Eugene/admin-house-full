'use server';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';
import { UnitTemplateGetCommand } from 'src/shared/contracts/unit-template';

export async function getUnitTemplate(workspaceId: string, handbookId: string, templateId: string) {
  return callAction<UnitTemplateGetCommand.ResponseEntity>(() =>
    axiosInstance.get(
      axiosEndpoints.unit_template.get
        .replace(':workspaceId', workspaceId)
        .replace(':handbookId', handbookId)
        .replace(':templateId', templateId)
    )
  );
}
