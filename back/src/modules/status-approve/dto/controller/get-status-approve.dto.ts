import { createZodDto } from 'nestjs-zod';
import { EntityUrlParamCommand } from 'libs/contracts';
import { StatusApproveGetCommand } from 'libs/contracts';

export type StatusApproveGetRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class StatusApproveGetResponseDto extends createZodDto(StatusApproveGetCommand.ResponseSchema) {}
