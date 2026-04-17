import { createZodDto } from 'nestjs-zod';
import { EstimateSectionCreateCommand } from 'libs/contracts';

export class EstimateSectionCreateRequestDto extends createZodDto(EstimateSectionCreateCommand.RequestSchema) {}
export class EstimateSectionCreateResponseDto extends createZodDto(EstimateSectionCreateCommand.ResponseSchema) {}
