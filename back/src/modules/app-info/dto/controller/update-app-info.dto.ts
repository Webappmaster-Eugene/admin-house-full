import { createZodDto } from 'nestjs-zod';
import { AppInfoUpdateCommand } from '@numart/house-admin-contracts';

export class AppInfoUpdateRequestDto extends createZodDto(AppInfoUpdateCommand.RequestSchema) {}

export class AppInfoUpdateResponseDto extends createZodDto(AppInfoUpdateCommand.ResponseSchema) {}
