import { z } from 'zod';

export const EAppStatusVariants = z.enum(['UP', 'DOWN']);
