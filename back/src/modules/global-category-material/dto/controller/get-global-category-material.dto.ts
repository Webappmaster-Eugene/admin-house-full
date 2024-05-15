import { createZodDto } from 'nestjs-zod';

import { EntityUrlParamCommand } from '../../../../../libs/contracts/commands/common/entity-url-param.command';
import { GlobalCategoryMaterialGetCommand } from '../../../../../libs/contracts';

export type GlobalCategoryMaterialGetRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class GlobalCategoryMaterialGetResponseDto extends createZodDto(GlobalCategoryMaterialGetCommand.ResponseSchema) {}
