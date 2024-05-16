import { createZodDto } from 'nestjs-zod';
import { MaterialGetCommand } from '@numart/house-admin-contracts';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export type MaterialGetRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class MaterialGetResponseDto extends createZodDto(MaterialGetCommand.ResponseSchema) {}
