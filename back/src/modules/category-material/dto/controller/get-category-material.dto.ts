import { createZodDto } from 'nestjs-zod';
import { CategoryMaterialGetCommand } from 'libs/contracts';
import { EntityUrlParamCommand } from 'libs/contracts/commands/common/entity-url-param.command';

export type CategoryMaterialGetRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class CategoryMaterialGetResponseDto extends createZodDto(CategoryMaterialGetCommand.ResponseSchema) {}
