import { createZodDto } from 'nestjs-zod';
import { OrganizationGetAllCommand } from '../../../../../libs/contracts';

export class OrganizationGetAllResponseDto extends createZodDto(OrganizationGetAllCommand.ResponseSchema) {}
