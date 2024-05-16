import { createZodDto } from 'nestjs-zod';
import { UserCreateCommand } from '@numart/house-admin-contracts';

export class UserCreateRequestDto extends createZodDto(UserCreateCommand.RequestSchema) {}

export class UserCreateResponseDto extends createZodDto(UserCreateCommand.ResponseSchema) {}
