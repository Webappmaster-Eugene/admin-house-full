import { createZodDto } from 'nestjs-zod';
import { CategoryMaterialDeleteCommand } from 'libs/contracts';
import { EntityUrlParamCommand } from 'libs/contracts';

export type CategoryMaterialDeleteRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class CategoryMaterialDeleteResponseDto extends createZodDto(CategoryMaterialDeleteCommand.ResponseSchema) {}
