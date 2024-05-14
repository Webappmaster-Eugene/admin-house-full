import { z } from 'zod';

export const EUserVariants = z.enum(['ADMIN', 'MANAGER', 'WORKER', 'CUSTOMER']);
