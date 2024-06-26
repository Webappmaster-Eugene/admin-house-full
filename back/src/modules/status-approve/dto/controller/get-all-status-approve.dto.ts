import { createZodDto } from 'nestjs-zod';
import { StatusApproveGetAllCommand } from 'libs/contracts';

export class StatusApproveGetAllResponseDto extends createZodDto(StatusApproveGetAllCommand.ResponseSchema) {}
