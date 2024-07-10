import { createZodDto } from 'nestjs-zod';
import { EntityUrlParamCommand } from 'libs/contracts/commands/common/entity-url-param.command';
import { StatusApproveDeleteCommand } from 'libs/contracts';

export type StatusApproveDeleteRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class StatusApproveDeleteResponseDto extends createZodDto(StatusApproveDeleteCommand.ResponseSchema) {}
