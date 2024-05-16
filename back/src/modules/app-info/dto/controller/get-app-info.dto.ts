import { createZodDto } from 'nestjs-zod';
import { AppInfoGetCommand } from '@numart/house-admin-contracts';

export class AppInfoGetResponseDto extends createZodDto(AppInfoGetCommand.ResponseSchema) {}
