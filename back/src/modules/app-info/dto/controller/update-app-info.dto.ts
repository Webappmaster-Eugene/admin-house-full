import { createZodDto } from 'nestjs-zod';
import { AppInfoUpdateCommand } from '../../../../../libs/contracts';

export class AppInfoUpdateRequestDto extends createZodDto(
  AppInfoUpdateCommand.RequestSchema,
) {}

export class AppInfoUpdateResponseDto extends createZodDto(
  AppInfoUpdateCommand.ResponseSchema,
) {}
