import { createZodDto } from 'nestjs-zod';
import { HandbookDeleteCommand } from '@numart/house-admin-contracts';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export type HandbookDeleteRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class HandbookDeleteResponseDto extends createZodDto(HandbookDeleteCommand.ResponseSchema) {}
