import { createZodDto } from 'nestjs-zod';
import { GlobalCategoryMaterialUpdateCommand } from 'libs/contracts';
import { EntityUrlParamCommand } from 'libs/contracts';

export type GlobalCategoryMaterialUpdateRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class GlobalCategoryMaterialUpdateRequestDto extends createZodDto(GlobalCategoryMaterialUpdateCommand.RequestSchema) {}

export class GlobalCategoryMaterialUpdateResponseDto extends createZodDto(GlobalCategoryMaterialUpdateCommand.ResponseSchema) {}
