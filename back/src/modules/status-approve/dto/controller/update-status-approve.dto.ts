import { createZodDto } from 'nestjs-zod';
import { EntityUrlParamCommand } from 'libs/contracts/commands/common/entity-url-param.command';
import { StatusApproveUpdateCommand } from 'libs/contracts';

export type StatusApproveUpdateRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class StatusApproveUpdateRequestDto extends createZodDto(StatusApproveUpdateCommand.RequestSchema) {}

export class StatusApproveUpdateResponseDto extends createZodDto(StatusApproveUpdateCommand.ResponseSchema) {}
