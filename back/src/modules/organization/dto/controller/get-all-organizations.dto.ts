import { createZodDto } from 'nestjs-zod';
import { OrganizationGetAllCommand } from '@numart/house-admin-contracts';

export class OrganizationGetAllResponseDto extends createZodDto(OrganizationGetAllCommand.ResponseSchema) {}
