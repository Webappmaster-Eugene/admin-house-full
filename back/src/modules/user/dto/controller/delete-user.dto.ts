import { createZodDto } from 'nestjs-zod';
import { UserDeleteCommand } from '@numart/house-admin-contracts';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export type UserDeleteRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class UserDeleteResponseDto extends createZodDto(UserDeleteCommand.ResponseSchema) {}
