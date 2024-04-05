import { createZodDto } from 'nestjs-zod';
import { RoleGetCommand } from '../../../../../libs/contracts';

export class RoleGetResponseDto extends createZodDto(
  RoleGetCommand.,
) {}

export class RoleGetResponseDto extends createZodDto(
  RoleGetCommand.ResponseSchema,
) {}
