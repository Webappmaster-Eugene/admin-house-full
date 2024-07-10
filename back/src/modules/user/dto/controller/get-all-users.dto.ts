import { createZodDto } from 'nestjs-zod';
import { UserGetAllCommand } from 'libs/contracts';

export class UserGetAllResponseDto extends createZodDto(UserGetAllCommand.ResponseSchema) {}
