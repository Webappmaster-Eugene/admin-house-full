import { createZodDto } from 'nestjs-zod';
import { AuthGenerateKeyCommand } from '@numart/house-admin-contracts';

export class AuthGenerateKeyRequestDto extends createZodDto(AuthGenerateKeyCommand.RequestSchema) {}

export class AuthGenerateKeyResponseDto extends createZodDto(AuthGenerateKeyCommand.ResponseSchema) {}
