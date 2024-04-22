import { createZodDto } from 'nestjs-zod';
import { AddUserToOrganizationCommand } from '../../../../../libs/contracts';

export class AddUserToOrganizationRequestDto extends createZodDto(
  AddUserToOrganizationCommand.RequestSchema,
) {}

export class AddUserToOrganizationResponseDto extends createZodDto(
  AddUserToOrganizationCommand.ResponseSchema,
) {}
