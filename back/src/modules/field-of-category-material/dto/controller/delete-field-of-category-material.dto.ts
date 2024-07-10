import { createZodDto } from 'nestjs-zod';
import { FieldOfCategoryMaterialDeleteCommand } from 'libs/contracts';
import { EntityUrlParamCommand } from 'libs/contracts/commands/common/entity-url-param.command';

export type FieldOfCategoryMaterialDeleteRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class FieldOfCategoryMaterialDeleteResponseDto extends createZodDto(FieldOfCategoryMaterialDeleteCommand.ResponseSchema) {}
