import { z } from 'zod';

export const EApproveStatusVariants = z.enum(['ONAPPROVAL', 'REFUSUAL', 'AGREED']);
