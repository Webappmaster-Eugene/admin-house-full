import { createZodDto } from 'nestjs-zod';
import { MaterialUpdateCommand } from 'libs/contracts';
import { EntityUrlParamCommand } from 'libs/contracts';
import { MaterialUpdateCategoryCommand } from 'libs/contracts/src/commands/material/update-category.command';

export type MaterialUpdateCategoryRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class MaterialUpdateCategoryRequestDto extends createZodDto(MaterialUpdateCategoryCommand.RequestSchema) {}

export class MaterialUpdateCategoryResponseDto extends createZodDto(MaterialUpdateCategoryCommand.ResponseSchema) {}
