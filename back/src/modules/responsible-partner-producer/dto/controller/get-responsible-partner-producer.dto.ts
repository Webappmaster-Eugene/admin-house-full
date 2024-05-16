import { createZodDto } from 'nestjs-zod';
import { ResponsiblePartnerProducerGetCommand } from '@numart/house-admin-contracts';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export type ResponsiblePartnerProducerGetRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class ResponsiblePartnerProducerGetResponseDto extends createZodDto(ResponsiblePartnerProducerGetCommand.ResponseSchema) {}
