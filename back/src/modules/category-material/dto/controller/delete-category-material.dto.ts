import { createZodDto } from 'nestjs-zod';
import { CategoryMaterialDeleteCommand } from '@numart/house-admin-contracts';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export type CategoryMaterialDeleteRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class CategoryMaterialDeleteResponseDto extends createZodDto(CategoryMaterialDeleteCommand.ResponseSchema) {}
