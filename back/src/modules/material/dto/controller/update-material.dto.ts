import { createZodDto } from 'nestjs-zod';
import { MaterialUpdateCommand } from '@numart/house-admin-contracts';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export type MaterialUpdateRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class MaterialUpdateRequestDto extends createZodDto(MaterialUpdateCommand.RequestSchema) {}

export class MaterialUpdateResponseDto extends createZodDto(MaterialUpdateCommand.ResponseSchema) {}
