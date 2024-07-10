import { createZodDto } from 'nestjs-zod';
import { FieldOfCategoryMaterialCreateCommand } from 'libs/contracts';

export class FieldOfCategoryMaterialCreateRequestDto extends createZodDto(FieldOfCategoryMaterialCreateCommand.RequestSchema) {}

export class FieldOfCategoryMaterialCreateResponseDto extends createZodDto(FieldOfCategoryMaterialCreateCommand.ResponseSchema) {}
