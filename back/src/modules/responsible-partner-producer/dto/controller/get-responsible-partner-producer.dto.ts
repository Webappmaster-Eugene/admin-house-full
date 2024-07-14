import { createZodDto } from 'nestjs-zod';
import { ResponsiblePartnerProducerGetCommand } from 'libs/contracts';
import { EntityUrlParamCommand } from 'libs/contracts';

export type ResponsiblePartnerProducerGetRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class ResponsiblePartnerProducerGetResponseDto extends createZodDto(ResponsiblePartnerProducerGetCommand.ResponseSchema) {}
