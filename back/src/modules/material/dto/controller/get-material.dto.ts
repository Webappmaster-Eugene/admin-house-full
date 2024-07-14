import { createZodDto } from 'nestjs-zod';
import { MaterialGetCommand } from 'libs/contracts';
import { EntityUrlParamCommand } from 'libs/contracts';

export type MaterialGetRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class MaterialGetResponseDto extends createZodDto(MaterialGetCommand.ResponseSchema) {}
