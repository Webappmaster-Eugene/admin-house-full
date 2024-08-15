"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EActiveStatusVariants = void 0;
const zod_1 = require("zod");
exports.EActiveStatusVariants = zod_1.z.enum(['ACTIVE', 'INACTIVE', 'DELETED']);
