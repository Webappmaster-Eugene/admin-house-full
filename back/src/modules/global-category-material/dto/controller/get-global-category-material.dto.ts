import { createZodDto } from 'nestjs-zod';

import { EntityUrlParamCommand } from 'libs/contracts';
import { GlobalCategoryMaterialGetCommand } from 'libs/contracts';

export type GlobalCategoryMaterialGetRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class GlobalCategoryMaterialGetResponseDto extends createZodDto(GlobalCategoryMaterialGetCommand.ResponseSchema) {}
