import { createZodDto } from 'nestjs-zod';
import { PriceChangingGetAllCommand } from 'libs/contracts';

export class PriceChangingGetAllResponseDto extends createZodDto(PriceChangingGetAllCommand.ResponseSchema) {}
