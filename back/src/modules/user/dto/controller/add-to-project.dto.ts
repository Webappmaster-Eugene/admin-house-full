import { createZodDto } from 'nestjs-zod';
import { UserAddToProjectCommand } from '@numart/house-admin-contracts';

export class UserAddToProjectRequestDto extends createZodDto(UserAddToProjectCommand.RequestSchema) {}

export class UserAddToProjectResponseDto extends createZodDto(UserAddToProjectCommand.ResponseSchema) {}
