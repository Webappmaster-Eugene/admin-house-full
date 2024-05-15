import { createZodDto } from 'nestjs-zod';
import { AddUserToWorkspaceCommand } from '../../../../../libs/contracts';

export class AddUserToWorkspaceRequestDto extends createZodDto(AddUserToWorkspaceCommand.RequestSchema) {}

export class AddUserToWorkspaceResponseDto extends createZodDto(AddUserToWorkspaceCommand.ResponseSchema) {}
