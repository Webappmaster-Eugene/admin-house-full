import { createZodDto } from 'nestjs-zod';
import { FieldOfCategoryMaterialGetCommand } from '@numart/house-admin-contracts';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export type FieldOfCategoryMaterialGetRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class FieldOfCategoryMaterialGetResponseDto extends createZodDto(FieldOfCategoryMaterialGetCommand.ResponseSchema) {}
