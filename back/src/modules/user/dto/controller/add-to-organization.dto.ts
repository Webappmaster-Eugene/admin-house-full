import { createZodDto } from 'nestjs-zod';
import { UserAddToOrganizationCommand } from 'libs/contracts';

export class UserAddToOrganizationRequestDto extends createZodDto(UserAddToOrganizationCommand.RequestSchema) {}

export class UserAddToOrganizationResponseDto extends createZodDto(UserAddToOrganizationCommand.ResponseSchema) {}
