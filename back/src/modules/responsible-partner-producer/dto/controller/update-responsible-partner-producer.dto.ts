import { createZodDto } from 'nestjs-zod';
import { ResponsiblePartnerProducerUpdateCommand } from 'libs/contracts';
import { EntityUrlParamCommand } from 'libs/contracts/commands/common/entity-url-param.command';

export type ResponsiblePartnerProducerUpdateRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class ResponsiblePartnerProducerUpdateRequestDto extends createZodDto(ResponsiblePartnerProducerUpdateCommand.RequestSchema) {}

export class ResponsiblePartnerProducerUpdateResponseDto extends createZodDto(ResponsiblePartnerProducerUpdateCommand.ResponseSchema) {}
