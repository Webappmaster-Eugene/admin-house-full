import { z } from 'zod';

export const EEstimateItemTypeVariants = z.enum(['MATERIAL', 'MECHANISM', 'WORK', 'OVERHEAD', 'UNIT']);
