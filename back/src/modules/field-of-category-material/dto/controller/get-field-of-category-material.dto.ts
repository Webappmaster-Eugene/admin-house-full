import { createZodDto } from 'nestjs-zod';
import { FieldOfCategoryMaterialGetCommand } from 'libs/contracts';
import { EntityUrlParamCommand } from 'libs/contracts/commands/common/entity-url-param.command';

export type FieldOfCategoryMaterialGetRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class FieldOfCategoryMaterialGetResponseDto extends createZodDto(FieldOfCategoryMaterialGetCommand.ResponseSchema) {}
