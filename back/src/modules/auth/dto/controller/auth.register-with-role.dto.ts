import { createZodDto } from 'nestjs-zod';
import { AuthRegisterWithRoleCommand } from '@numart/house-admin-contracts';

export class AuthRegisterWithRoleRequestDto extends createZodDto(AuthRegisterWithRoleCommand.RequestSchema) {}

export class AuthRegisterWithRoleRequestParamDto extends createZodDto(AuthRegisterWithRoleCommand.RequestParamSchema) {}

export class AuthRegisterWithRoleResponseDto extends createZodDto(AuthRegisterWithRoleCommand.ResponseSchema) {}
