import { z } from 'zod';

export const ECurrencyVariants = z.enum(['RUB', 'USD', 'EUR', 'BYR']);
