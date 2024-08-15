import { z } from 'zod';

export const EActiveStatusVariants = z.enum(['ACTIVE', 'INACTIVE', 'DELETED']);
