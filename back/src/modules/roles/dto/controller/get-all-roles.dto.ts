import { createZodDto } from 'nestjs-zod';
import { RoleGetAllCommand } from 'libs/contracts';

export class RoleGetAllResponseDto extends createZodDto(RoleGetAllCommand.ResponseSchema) {}
