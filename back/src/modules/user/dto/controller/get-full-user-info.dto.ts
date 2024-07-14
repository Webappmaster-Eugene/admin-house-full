import { createZodDto } from 'nestjs-zod';
import { UserGetFullInfoCommand } from 'libs/contracts';

export class UserGetFullInfoResponseDto extends createZodDto(UserGetFullInfoCommand.ResponseSchema) {}
