import { createZodDto } from 'nestjs-zod';
import { ResponsiblePartnerProducerDeleteCommand } from '@numart/house-admin-contracts';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export type ResponsiblePartnerProducerDeleteRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class ResponsiblePartnerProducerDeleteResponseDto extends createZodDto(ResponsiblePartnerProducerDeleteCommand.ResponseSchema) {}
