import { createZodDto } from 'nestjs-zod';
import { MaterialDeleteCommand } from 'libs/contracts';
import { EntityUrlParamCommand } from 'libs/contracts';

export type MaterialDeleteRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class MaterialDeleteResponseDto extends createZodDto(MaterialDeleteCommand.ResponseSchema) {}
