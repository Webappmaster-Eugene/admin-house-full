import { createZodDto } from 'nestjs-zod';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';
import { StatusApproveGetCommand } from 'libs/contracts';

export type StatusApproveGetRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class StatusApproveGetResponseDto extends createZodDto(StatusApproveGetCommand.ResponseSchema) {}
