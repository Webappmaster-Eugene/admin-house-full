"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestGetAllQuerySchema = void 0;
const zod_1 = require("zod");
exports.RequestGetAllQuerySchema = zod_1.z
    .object({
    take: zod_1.z.number().multipleOf(5).nonnegative().max(1000 /* QUANTITY_LIMIT_QUERY.TAKE_MAX_LIMIT */).optional().default(5 /* QUANTITY_LIMIT_QUERY.TAKE_5 */),
    skip: zod_1.z.number().nonnegative().optional().default(0),
})
    .refine(data => {
    const takeValue = data.take || 5 /* QUANTITY_LIMIT_QUERY.TAKE_5 */;
    return data.skip % takeValue === 0;
}, {
    message: 'The value of skip must be divisible by the value of take',
    path: ['skip/take'], // path of error
});
