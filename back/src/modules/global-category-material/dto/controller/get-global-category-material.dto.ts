import { createZodDto } from 'nestjs-zod';

import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';
import { GlobalCategoryMaterialGetCommand } from '@numart/house-admin-contracts';

export type GlobalCategoryMaterialGetRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class GlobalCategoryMaterialGetResponseDto extends createZodDto(GlobalCategoryMaterialGetCommand.ResponseSchema) {}
