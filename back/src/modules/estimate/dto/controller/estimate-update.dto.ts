import { createZodDto } from 'nestjs-zod';
import { EstimateUpdateCommand } from 'libs/contracts';

export class EstimateUpdateRequestDto extends createZodDto(EstimateUpdateCommand.RequestSchema) {}
export class EstimateUpdateResponseDto extends createZodDto(EstimateUpdateCommand.ResponseSchema) {}
