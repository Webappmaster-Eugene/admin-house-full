import { createZodDto } from 'nestjs-zod';
import { ResponsiblePartnerProducerGetCommand } from '../../../../../libs/contracts';
import { EntityUrlParamCommand } from '../../../../../libs/contracts/commands/common/entity-url-param.command';

export type ResponsiblePartnerProducerGetRequestParamDto =
  EntityUrlParamCommand.RequestUuidParam;

export class ResponsiblePartnerProducerGetResponseDto extends createZodDto(
  ResponsiblePartnerProducerGetCommand.ResponseSchema,
) {}
