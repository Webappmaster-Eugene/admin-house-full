import { createZodDto } from 'nestjs-zod';
import { RoleCreateCommand } from '@numart/house-admin-contracts';

export class RoleCreateRequestDto extends createZodDto(RoleCreateCommand.RequestSchema) {}

export class RoleCreateResponseDto extends createZodDto(RoleCreateCommand.ResponseSchema) {}
