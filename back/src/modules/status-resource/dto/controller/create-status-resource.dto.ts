import { createZodDto } from 'nestjs-zod';
import { StatusResourceCreateCommand } from '../../../../../libs/contracts';

export class StatusResourceCreateRequestDto extends createZodDto(StatusResourceCreateCommand.RequestSchema) {}

export class StatusResourceCreateResponseDto extends createZodDto(StatusResourceCreateCommand.ResponseSchema) {}
