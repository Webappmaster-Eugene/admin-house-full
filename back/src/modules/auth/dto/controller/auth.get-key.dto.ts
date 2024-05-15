import { createZodDto } from 'nestjs-zod';
import { AuthGetKeyCommand } from '../../../../../libs/contracts';

export class AuthGetKeyResponseDto extends createZodDto(AuthGetKeyCommand.ResponseSchema) {}
