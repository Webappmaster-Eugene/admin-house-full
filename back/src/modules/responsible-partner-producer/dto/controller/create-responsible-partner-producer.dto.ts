import { createZodDto } from 'nestjs-zod';
import { ResponsiblePartnerProducerCreateCommand } from '@numart/house-admin-contracts';

export class ResponsiblePartnerProducerCreateRequestDto extends createZodDto(ResponsiblePartnerProducerCreateCommand.RequestSchema) {}

export class ResponsiblePartnerProducerCreateResponseDto extends createZodDto(ResponsiblePartnerProducerCreateCommand.ResponseSchema) {}
