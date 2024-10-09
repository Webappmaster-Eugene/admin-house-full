'use server';

import { AxiosError } from 'axios';
import { ResponsiblePartnerProducerGetAllCommand } from '@numart/house-admin-contracts';

import { ErrorFromBackend } from 'src/utils/types/error-from-backend.type';
import { isGoodHttpCode } from 'src/utils/helpers/is-good-http-code.helper';

import axiosInstance from 'src/api/axios-instance';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function getAllResponsiblePartnersProducersInHandbook(
  workspaceId: string,
  handbookId: string
) {
  const errorObject: ErrorFromBackend = {
    error: null,
  };

  try {
    const response: ResponsiblePartnerProducerGetAllCommand.Response = await axiosInstance.get(
      axiosEndpoints.responsible_partner_producer.get_all_in_handbook
        .replace(':workspaceId', workspaceId)
        .replace(':handbookId', handbookId)
    );

    if (isGoodHttpCode(response?.statusCode)) {
      return response.data as ResponsiblePartnerProducerGetAllCommand.ResponseEntity;
    }

    console.error(
      'Standard backend error while get all responsible partner producerc in handbook by user',
      response
    );
    if (response?.errors) {
      errorObject.error = response.errors[0];
      return errorObject;
    }
    errorObject.error = response?.message;
    return errorObject;
  } catch (error: unknown) {
    console.error(
      'Catched frontend error while get all responsible partner producerc in handbook by user',
      error
    );
    if (error instanceof AxiosError) {
      errorObject.error = error.message;
      return errorObject;
    }
    errorObject.error = JSON.stringify(error);
    return errorObject;
  }
}
