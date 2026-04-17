import { createZodDto } from 'nestjs-zod';
import { EstimateDeleteCommand } from 'libs/contracts';

export class EstimateDeleteResponseDto extends createZodDto(EstimateDeleteCommand.ResponseSchema) {}
