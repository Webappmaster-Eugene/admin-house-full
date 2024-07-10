import { createZodDto } from 'nestjs-zod';
import { AuthRegisterCommand } from 'libs/contracts';

export class AuthRegisterRequestDto extends createZodDto(AuthRegisterCommand.RequestSchema) {}

export class AuthRegisterResponseDto extends createZodDto(AuthRegisterCommand.ResponseSchema) {}
