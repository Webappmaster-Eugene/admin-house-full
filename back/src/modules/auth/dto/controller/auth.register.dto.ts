import { createZodDto } from 'nestjs-zod';
import { AuthRegisterCommand } from '@numart/house-admin-contracts';

export class AuthRegisterRequestDto extends createZodDto(AuthRegisterCommand.RequestSchema) {}

export class AuthRegisterResponseDto extends createZodDto(AuthRegisterCommand.ResponseSchema) {}
