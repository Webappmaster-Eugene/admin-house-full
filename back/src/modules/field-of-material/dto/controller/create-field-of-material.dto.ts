import { createZodDto } from 'nestjs-zod';
import { FieldOfMaterialCreateCommand } from '@numart/house-admin-contracts';

export class FieldOfMaterialCreateRequestDto extends createZodDto(FieldOfMaterialCreateCommand.RequestSchema) {}

export class FieldOfMaterialCreateResponseDto extends createZodDto(FieldOfMaterialCreateCommand.ResponseSchema) {}
