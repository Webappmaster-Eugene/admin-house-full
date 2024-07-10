import { createZodDto } from 'nestjs-zod';
import { UserAddToWorkspaceCommand } from 'libs/contracts';

export class UserAddToWorkspaceRequestDto extends createZodDto(UserAddToWorkspaceCommand.RequestSchema) {}

export class UserAddToWorkspaceResponseDto extends createZodDto(UserAddToWorkspaceCommand.ResponseSchema) {}
