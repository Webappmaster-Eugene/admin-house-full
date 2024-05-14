import { z } from 'zod';
import { QUANTITY_LIMIT } from '../../../../../src/common/consts/take-quantity.limitation';
import { QUANTITY_LIMIT_QUERY } from '../../../enums/quantity.limit';

export const RequestGetAllQuerySchema = z
  .object({
    take: z.number().multipleOf(5).nonnegative().max(QUANTITY_LIMIT_QUERY.TAKE_MAX_LIMIT).optional().default(QUANTITY_LIMIT.TAKE_5),
    skip: z.number().nonnegative().optional().default(0),
  })
  .refine(
    data => {
      const takeValue = data.take || QUANTITY_LIMIT.TAKE_5;
      return data.skip % takeValue === 0;
    },
    {
      message: 'The value of skip must be divisible by the value of take',
      path: ['skip/take'], // path of error
    },
  );
