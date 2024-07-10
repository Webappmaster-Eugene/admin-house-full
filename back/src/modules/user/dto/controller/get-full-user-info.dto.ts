import { createZodDto } from 'nestjs-zod';
import { UserGetCommand } from 'libs/contracts';
import { UserGetFullInfoCommand } from 'libs/contracts';

export class UserGetFullInfoResponseDto extends createZodDto(UserGetFullInfoCommand.ResponseSchema) {}
