import { createZodDto } from 'nestjs-zod';
import { EstimateGetCommand } from 'libs/contracts';

export class EstimateGetResponseDto extends createZodDto(EstimateGetCommand.ResponseSchema) {}
