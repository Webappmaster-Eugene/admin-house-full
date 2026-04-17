import { createZodDto } from 'nestjs-zod';
import { UnitTemplateGetAllCommand, UnitTemplateGetCommand, UnitTemplateDeleteCommand } from 'libs/contracts';

export class UnitTemplateGetResponseDto extends createZodDto(UnitTemplateGetCommand.ResponseSchema) {}
export class UnitTemplateGetAllResponseDto extends createZodDto(UnitTemplateGetAllCommand.ResponseSchema) {}
export class UnitTemplateDeleteResponseDto extends createZodDto(UnitTemplateDeleteCommand.ResponseSchema) {}
