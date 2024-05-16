import { createZodDto } from 'nestjs-zod';
import { AddUserToWorkspaceCommand } from '@numart/house-admin-contracts';

export class AddUserToWorkspaceRequestDto extends createZodDto(AddUserToWorkspaceCommand.RequestSchema) {}

export class AddUserToWorkspaceResponseDto extends createZodDto(AddUserToWorkspaceCommand.ResponseSchema) {}
