import { createZodDto } from 'nestjs-zod';
import { AuthGetKeyCommand } from '@numart/house-admin-contracts';

export class AuthGetKeyResponseDto extends createZodDto(AuthGetKeyCommand.ResponseSchema) {}
