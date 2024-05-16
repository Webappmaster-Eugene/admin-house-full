import { createZodDto } from 'nestjs-zod';
import { AddUserToProjectCommand } from '@numart/house-admin-contracts';

export class AddUserToProjectRequestDto extends createZodDto(AddUserToProjectCommand.RequestSchema) {}

export class AddUserToProjectResponseDto extends createZodDto(AddUserToProjectCommand.ResponseSchema) {}
