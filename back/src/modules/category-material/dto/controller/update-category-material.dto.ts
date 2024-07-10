import { createZodDto } from 'nestjs-zod';
import { CategoryMaterialUpdateCommand } from 'libs/contracts';
import { EntityUrlParamCommand } from 'libs/contracts/commands/common/entity-url-param.command';

export type CategoryMaterialUpdateRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class CategoryMaterialUpdateRequestDto extends createZodDto(CategoryMaterialUpdateCommand.RequestSchema) {}

export class CategoryMaterialUpdateResponseDto extends createZodDto(CategoryMaterialUpdateCommand.ResponseSchema) {}
