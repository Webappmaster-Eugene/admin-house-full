import { createZodDto } from 'nestjs-zod';
import { CategoryMaterialGetCommand } from '@numart/house-admin-contracts';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export type CategoryMaterialGetRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class CategoryMaterialGetResponseDto extends createZodDto(CategoryMaterialGetCommand.ResponseSchema) {}
