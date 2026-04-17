import { createZodDto } from 'nestjs-zod';
import { EstimateItemCreateCommand } from 'libs/contracts';

export class EstimateItemCreateRequestDto extends createZodDto(EstimateItemCreateCommand.RequestSchema) {}
export class EstimateItemCreateResponseDto extends createZodDto(EstimateItemCreateCommand.ResponseSchema) {}
