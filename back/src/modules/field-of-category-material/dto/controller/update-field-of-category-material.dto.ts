import { createZodDto } from 'nestjs-zod';
import { FieldOfCategoryMaterialUpdateCommand } from 'libs/contracts';
import { EntityUrlParamCommand } from 'libs/contracts';

export type FieldOfCategoryMaterialUpdateRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class FieldOfCategoryMaterialUpdateRequestDto extends createZodDto(FieldOfCategoryMaterialUpdateCommand.RequestSchema) {}

export class FieldOfCategoryMaterialUpdateResponseDto extends createZodDto(FieldOfCategoryMaterialUpdateCommand.ResponseSchema) {}
