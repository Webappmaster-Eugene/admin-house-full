import { createZodDto } from 'nestjs-zod';
import { OrganizationCreateCommand } from '@numart/house-admin-contracts';

export class OrganizationCreateRequestDto extends createZodDto(OrganizationCreateCommand.RequestSchema) {}

export class OrganizationCreateResponseDto extends createZodDto(OrganizationCreateCommand.ResponseSchema) {}
