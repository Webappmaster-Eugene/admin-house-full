import { createZodDto } from 'nestjs-zod';
import { UserGetCommand } from '@numart/house-admin-contracts';

export class UserGetResponseDto extends createZodDto(UserGetCommand.ResponseSchema) {}
