"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EUserVariants = void 0;
const zod_1 = require("zod");
exports.EUserVariants = zod_1.z.enum(['ADMIN', 'MANAGER', 'WORKER', 'CUSTOMER']);
