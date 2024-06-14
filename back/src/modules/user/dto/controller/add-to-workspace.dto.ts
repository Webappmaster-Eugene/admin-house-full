import { createZodDto } from 'nestjs-zod';
import { UserAddToWorkspaceCommand } from '@numart/house-admin-contracts';

export class UserAddToWorkspaceRequestDto extends createZodDto(UserAddToWorkspaceCommand.RequestSchema) {}

export class UserAddToWorkspaceResponseDto extends createZodDto(UserAddToWorkspaceCommand.ResponseSchema) {}
