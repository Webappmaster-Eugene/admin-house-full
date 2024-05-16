import { z } from 'zod';

export const EFieldTypeVariants = z.enum(['number', 'string', 'array']);
