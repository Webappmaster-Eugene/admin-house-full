import { createZodDto } from 'nestjs-zod';
import { EstimateGetAllCommand } from 'libs/contracts';

export class EstimateGetAllResponseDto extends createZodDto(EstimateGetAllCommand.ResponseSchema) {}
