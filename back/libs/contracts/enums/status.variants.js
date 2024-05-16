"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EStatusVariants = void 0;
const zod_1 = require("zod");
exports.EStatusVariants = zod_1.z.enum(['UP', 'DOWN']);
