import { createZodDto } from 'nestjs-zod';
import { FieldOfCategoryMaterialGetCommand } from 'libs/contracts';
import { EntityUrlParamCommand } from 'libs/contracts';

export type FieldOfCategoryMaterialGetRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class FieldOfCategoryMaterialGetResponseDto extends createZodDto(FieldOfCategoryMaterialGetCommand.ResponseSchema) {}
