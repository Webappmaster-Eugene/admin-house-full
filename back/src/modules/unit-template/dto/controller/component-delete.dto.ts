import { createZodDto } from 'nestjs-zod';
import { UnitTemplateComponentDeleteCommand } from 'libs/contracts';

export class UnitTemplateComponentDeleteResponseDto extends createZodDto(UnitTemplateComponentDeleteCommand.ResponseSchema) {}
