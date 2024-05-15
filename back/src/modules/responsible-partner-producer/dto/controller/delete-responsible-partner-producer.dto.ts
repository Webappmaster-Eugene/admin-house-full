import { createZodDto } from 'nestjs-zod';
import { ResponsiblePartnerProducerDeleteCommand } from '../../../../../libs/contracts';
import { EntityUrlParamCommand } from '../../../../../libs/contracts/commands/common/entity-url-param.command';

export type ResponsiblePartnerProducerDeleteRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class ResponsiblePartnerProducerDeleteResponseDto extends createZodDto(ResponsiblePartnerProducerDeleteCommand.ResponseSchema) {}
