import { createZodDto } from 'nestjs-zod';
import { CategoryMaterialUpdateCommand } from '@numart/house-admin-contracts';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export type CategoryMaterialUpdateRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class CategoryMaterialUpdateRequestDto extends createZodDto(CategoryMaterialUpdateCommand.RequestSchema) {}

export class CategoryMaterialUpdateResponseDto extends createZodDto(CategoryMaterialUpdateCommand.ResponseSchema) {}
