import { createZodDto } from 'nestjs-zod';
import { RoleUpdateCommand } from '../../../../libs/contracts';

export class RoleUpdateRequestDto extends createZodDto(
  RoleUpdateCommand.RequestSchema,
) {}

export class RoleUpdateResponseDto extends createZodDto(
  RoleUpdateCommand.ResponseSchema,
) {}
