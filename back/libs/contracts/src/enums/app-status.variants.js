"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EAppStatusVariants = void 0;
const zod_1 = require("zod");
exports.EAppStatusVariants = zod_1.z.enum(['UP', 'DOWN']);
