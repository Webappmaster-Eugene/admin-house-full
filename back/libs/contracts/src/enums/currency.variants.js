"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ECurrencyVariants = void 0;
const zod_1 = require("zod");
exports.ECurrencyVariants = zod_1.z.enum(['RUB', 'USD', 'EUR', 'BYR']);
