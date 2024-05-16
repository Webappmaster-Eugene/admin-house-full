import { createZodDto } from 'nestjs-zod';
import { MaterialDeleteCommand } from '@numart/house-admin-contracts';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export type MaterialDeleteRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class MaterialDeleteResponseDto extends createZodDto(MaterialDeleteCommand.ResponseSchema) {}
