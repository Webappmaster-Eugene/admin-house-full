import { createZodDto } from 'nestjs-zod';
import { EstimateItemUpdateCommand } from 'libs/contracts';

export class EstimateItemUpdateRequestDto extends createZodDto(EstimateItemUpdateCommand.RequestSchema) {}
export class EstimateItemUpdateResponseDto extends createZodDto(EstimateItemUpdateCommand.ResponseSchema) {}
