import { createZodDto } from 'nestjs-zod';
import { AuthRefreshKeysCommand } from '@numart/house-admin-contracts';

export class AuthRefreshKeysResponseDto extends createZodDto(AuthRefreshKeysCommand.ResponseSchema) {}
