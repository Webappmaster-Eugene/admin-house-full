import { createZodDto } from 'nestjs-zod';
import { MaterialGetAllCommand } from '@numart/house-admin-contracts';

export class MaterialGetAllResponseDto extends createZodDto(MaterialGetAllCommand.ResponseSchema) {}
