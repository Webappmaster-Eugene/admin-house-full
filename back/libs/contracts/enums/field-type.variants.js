"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EFieldTypeVariants = void 0;
const zod_1 = require("zod");
exports.EFieldTypeVariants = zod_1.z.enum(['number', 'string', 'array']);
