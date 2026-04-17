import { createZodDto } from 'nestjs-zod';
import { EstimateItemDeleteCommand } from 'libs/contracts';

export class EstimateItemDeleteResponseDto extends createZodDto(EstimateItemDeleteCommand.ResponseSchema) {}
