import { createZodDto } from 'nestjs-zod';
import { EstimateSectionUpdateCommand } from 'libs/contracts';

export class EstimateSectionUpdateRequestDto extends createZodDto(EstimateSectionUpdateCommand.RequestSchema) {}
export class EstimateSectionUpdateResponseDto extends createZodDto(EstimateSectionUpdateCommand.ResponseSchema) {}
