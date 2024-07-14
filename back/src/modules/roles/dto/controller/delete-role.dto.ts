import { createZodDto } from 'nestjs-zod';
import { RoleDeleteCommand } from 'libs/contracts';
import { EntityUrlParamCommand } from 'libs/contracts';

export type RoleDeleteRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class RoleDeleteResponseDto extends createZodDto(RoleDeleteCommand.ResponseSchema) {}
