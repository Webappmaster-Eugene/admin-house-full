import { createZodDto } from 'nestjs-zod';
import { UnitTemplateCreateCommand } from 'libs/contracts';

export class UnitTemplateCreateRequestDto extends createZodDto(UnitTemplateCreateCommand.RequestSchema) {}
export class UnitTemplateCreateResponseDto extends createZodDto(UnitTemplateCreateCommand.ResponseSchema) {}
