import { createZodDto } from 'nestjs-zod';
import { FieldOfCategoryMaterialDeleteCommand } from '@numart/house-admin-contracts';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export type FieldOfCategoryMaterialDeleteRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class FieldOfCategoryMaterialDeleteResponseDto extends createZodDto(FieldOfCategoryMaterialDeleteCommand.ResponseSchema) {}
