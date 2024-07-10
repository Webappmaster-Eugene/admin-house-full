import { createZodDto } from 'nestjs-zod';
import { UserCreateCommand } from 'libs/contracts';

export class UserCreateRequestDto extends createZodDto(UserCreateCommand.RequestSchema) {}

export class UserCreateResponseDto extends createZodDto(UserCreateCommand.ResponseSchema) {}
