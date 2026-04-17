import { createZodDto } from 'nestjs-zod';
import { UnitTemplateUpdateCommand } from 'libs/contracts';

export class UnitTemplateUpdateRequestDto extends createZodDto(UnitTemplateUpdateCommand.RequestSchema) {}
export class UnitTemplateUpdateResponseDto extends createZodDto(UnitTemplateUpdateCommand.ResponseSchema) {}
