import { createZodDto } from 'nestjs-zod';
import { GlobalCategoryMaterialDeleteCommand } from '../../../../../libs/contracts';
import { EntityUrlParamCommand } from '../../../../../libs/contracts/commands/common/entity-url-param.command';

export type GlobalCategoryMaterialDeleteRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class GlobalCategoryMaterialDeleteResponseDto extends createZodDto(GlobalCategoryMaterialDeleteCommand.ResponseSchema) {}
