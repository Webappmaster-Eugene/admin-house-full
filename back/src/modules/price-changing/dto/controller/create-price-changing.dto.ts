import { createZodDto } from 'nestjs-zod';
import { PriceChangingCreateCommand } from '@numart/house-admin-contracts';

export class PriceChangingCreateRequestDto extends createZodDto(PriceChangingCreateCommand.RequestSchema) {}

export class PriceChangingCreateResponseDto extends createZodDto(PriceChangingCreateCommand.ResponseSchema) {}
