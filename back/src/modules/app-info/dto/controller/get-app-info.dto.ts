import { createZodDto } from 'nestjs-zod';
import { AppInfoGetCommand } from '../../../../../libs/contracts';

export class AppInfoGetResponseDto extends createZodDto(
  AppInfoGetCommand.ResponseSchema,
) {}
