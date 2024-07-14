import { createZodDto } from 'nestjs-zod';
import { FieldOfCategoryMaterialDeleteCommand } from 'libs/contracts';
import { EntityUrlParamCommand } from 'libs/contracts';

export type FieldOfCategoryMaterialDeleteRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class FieldOfCategoryMaterialDeleteResponseDto extends createZodDto(FieldOfCategoryMaterialDeleteCommand.ResponseSchema) {}
