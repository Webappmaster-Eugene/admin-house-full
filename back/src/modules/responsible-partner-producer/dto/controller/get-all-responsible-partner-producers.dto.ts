import { createZodDto } from 'nestjs-zod';
import { ResponsiblePartnerProducerGetAllCommand } from 'libs/contracts';

export class ResponsiblePartnerProducerGetAllResponseDto extends createZodDto(ResponsiblePartnerProducerGetAllCommand.ResponseSchema) {}
