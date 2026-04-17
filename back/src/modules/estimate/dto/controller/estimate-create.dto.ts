import { createZodDto } from 'nestjs-zod';
import { EstimateCreateCommand } from 'libs/contracts';

export class EstimateCreateRequestDto extends createZodDto(EstimateCreateCommand.RequestSchema) {}
export class EstimateCreateResponseDto extends createZodDto(EstimateCreateCommand.ResponseSchema) {}
