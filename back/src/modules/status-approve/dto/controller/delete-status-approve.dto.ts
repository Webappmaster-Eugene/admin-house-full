import { createZodDto } from 'nestjs-zod';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';
import { StatusApproveDeleteCommand } from 'libs/contracts';

export type StatusApproveDeleteRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class StatusApproveDeleteResponseDto extends createZodDto(StatusApproveDeleteCommand.ResponseSchema) {}
