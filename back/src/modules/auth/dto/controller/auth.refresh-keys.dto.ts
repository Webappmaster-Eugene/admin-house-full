import { createZodDto } from 'nestjs-zod';
import { AuthRefreshKeysCommand } from 'libs/contracts';

export class AuthRefreshKeysResponseDto extends createZodDto(AuthRefreshKeysCommand.ResponseSchema) {}
