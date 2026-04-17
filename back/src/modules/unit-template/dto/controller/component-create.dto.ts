import { createZodDto } from 'nestjs-zod';
import { UnitTemplateComponentCreateCommand } from 'libs/contracts';

export class UnitTemplateComponentCreateRequestDto extends createZodDto(UnitTemplateComponentCreateCommand.RequestSchema) {}
export class UnitTemplateComponentCreateResponseDto extends createZodDto(UnitTemplateComponentCreateCommand.ResponseSchema) {}
