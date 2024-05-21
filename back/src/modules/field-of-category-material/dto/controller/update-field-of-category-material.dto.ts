import { createZodDto } from 'nestjs-zod';
import { FieldOfCategoryMaterialUpdateCommand } from '@numart/house-admin-contracts';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export type FieldOfCategoryMaterialUpdateRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class FieldOfCategoryMaterialUpdateRequestDto extends createZodDto(FieldOfCategoryMaterialUpdateCommand.RequestSchema) {}

export class FieldOfCategoryMaterialUpdateResponseDto extends createZodDto(FieldOfCategoryMaterialUpdateCommand.ResponseSchema) {}
