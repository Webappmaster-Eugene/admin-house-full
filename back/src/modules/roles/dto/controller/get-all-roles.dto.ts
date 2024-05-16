import { createZodDto } from 'nestjs-zod';
import { RoleGetAllCommand } from '@numart/house-admin-contracts';

export class RoleGetAllResponseDto extends createZodDto(RoleGetAllCommand.ResponseSchema) {}
