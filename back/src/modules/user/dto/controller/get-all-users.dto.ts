import { createZodDto } from 'nestjs-zod';
import { UserGetAllCommand } from '@numart/house-admin-contracts';

export class UserGetAllResponseDto extends createZodDto(UserGetAllCommand.ResponseSchema) {}
