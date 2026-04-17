import { createZodDto } from 'nestjs-zod';
import { EstimateSectionDeleteCommand } from 'libs/contracts';

export class EstimateSectionDeleteResponseDto extends createZodDto(EstimateSectionDeleteCommand.ResponseSchema) {}
