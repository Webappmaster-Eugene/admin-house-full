import { createZodDto } from 'nestjs-zod';
import { PriceChangingGetAllCommand } from '@numart/house-admin-contracts';

export class PriceChangingGetAllResponseDto extends createZodDto(PriceChangingGetAllCommand.ResponseSchema) {}
