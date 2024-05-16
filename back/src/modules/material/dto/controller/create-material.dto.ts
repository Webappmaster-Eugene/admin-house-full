import { createZodDto } from 'nestjs-zod';
import { MaterialCreateCommand } from '@numart/house-admin-contracts';

export class MaterialCreateRequestDto extends createZodDto(MaterialCreateCommand.RequestSchema) {}

export class MaterialCreateResponseDto extends createZodDto(MaterialCreateCommand.ResponseSchema) {}
