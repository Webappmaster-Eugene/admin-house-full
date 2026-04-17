import { createZodDto } from 'nestjs-zod';
import { UnitTemplateComponentUpdateCommand } from 'libs/contracts';

export class UnitTemplateComponentUpdateRequestDto extends createZodDto(UnitTemplateComponentUpdateCommand.RequestSchema) {}
export class UnitTemplateComponentUpdateResponseDto extends createZodDto(UnitTemplateComponentUpdateCommand.ResponseSchema) {}
