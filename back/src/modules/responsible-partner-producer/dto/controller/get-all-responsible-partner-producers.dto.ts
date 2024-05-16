import { createZodDto } from 'nestjs-zod';
import { ResponsiblePartnerProducerGetAllCommand } from '@numart/house-admin-contracts';

export class ResponsiblePartnerProducerGetAllResponseDto extends createZodDto(ResponsiblePartnerProducerGetAllCommand.ResponseSchema) {}
