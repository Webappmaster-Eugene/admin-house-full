import { createZodDto } from 'nestjs-zod';
import { EntityUrlParamCommand } from 'libs/contracts';
import { StatusApproveDeleteCommand } from 'libs/contracts';

export type StatusApproveDeleteRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class StatusApproveDeleteResponseDto extends createZodDto(StatusApproveDeleteCommand.ResponseSchema) {}
