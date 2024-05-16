import { createZodDto } from 'nestjs-zod';
import { HandbookGetCommand } from '@numart/house-admin-contracts';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export type HandbookGetRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class HandbookGetResponseDto extends createZodDto(HandbookGetCommand.ResponseSchema) {}
