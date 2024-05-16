import { createZodDto } from 'nestjs-zod';
import { GlobalCategoryMaterialDeleteCommand } from '@numart/house-admin-contracts';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export type GlobalCategoryMaterialDeleteRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class GlobalCategoryMaterialDeleteResponseDto extends createZodDto(GlobalCategoryMaterialDeleteCommand.ResponseSchema) {}
