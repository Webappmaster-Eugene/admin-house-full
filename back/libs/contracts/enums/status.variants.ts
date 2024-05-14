import { z } from 'zod';

export const EStatusVariants = z.enum(['UP', 'DOWN']);
