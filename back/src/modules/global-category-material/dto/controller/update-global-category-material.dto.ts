import { createZodDto } from 'nestjs-zod';
import { GlobalCategoryMaterialUpdateCommand } from '@numart/house-admin-contracts';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export type GlobalCategoryMaterialUpdateRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class GlobalCategoryMaterialUpdateRequestDto extends createZodDto(GlobalCategoryMaterialUpdateCommand.RequestSchema) {}

export class GlobalCategoryMaterialUpdateResponseDto extends createZodDto(GlobalCategoryMaterialUpdateCommand.ResponseSchema) {}
