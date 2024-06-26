import { createZodDto } from 'nestjs-zod';
import { StatusApproveCreateCommand } from 'libs/contracts';

export class StatusApproveCreateRequestDto extends createZodDto(StatusApproveCreateCommand.RequestSchema) {}

export class StatusApproveCreateResponseDto extends createZodDto(StatusApproveCreateCommand.ResponseSchema) {}
