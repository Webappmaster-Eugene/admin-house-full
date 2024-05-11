import { createZodDto } from 'nestjs-zod';
import { UserGetCommand } from '../../../../../libs/contracts';

export class UserGetResponseDto extends createZodDto(UserGetCommand.ResponseSchema) {}
