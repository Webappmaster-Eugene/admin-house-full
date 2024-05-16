import { createZodDto } from 'nestjs-zod';
import { ResponsiblePartnerProducerUpdateCommand } from '@numart/house-admin-contracts';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export type ResponsiblePartnerProducerUpdateRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class ResponsiblePartnerProducerUpdateRequestDto extends createZodDto(ResponsiblePartnerProducerUpdateCommand.RequestSchema) {}

export class ResponsiblePartnerProducerUpdateResponseDto extends createZodDto(ResponsiblePartnerProducerUpdateCommand.ResponseSchema) {}
