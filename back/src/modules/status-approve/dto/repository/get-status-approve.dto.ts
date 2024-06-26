import { EApproveStatuses } from '@prisma/client';

export class StatusApproveGetMapperDto {
  uuid: string;
  name: EApproveStatuses;
  nameRu: string;
}
