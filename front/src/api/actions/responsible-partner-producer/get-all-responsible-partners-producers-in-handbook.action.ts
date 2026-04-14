'use server';

import { ResponsiblePartnerProducerGetAllCommand } from '@numart/house-admin-contracts';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function getAllResponsiblePartnersProducersInHandbook(
  workspaceId: string,
  handbookId: string
) {
  return callAction<ResponsiblePartnerProducerGetAllCommand.ResponseEntity>(() =>
    axiosInstance.get(
      axiosEndpoints.responsible_partner_producer.get_all_in_handbook
        .replace(':workspaceId', workspaceId)
        .replace(':handbookId', handbookId)
    )
  );
}
