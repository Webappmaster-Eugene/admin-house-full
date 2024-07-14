"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EApproveStatusVariants = void 0;
const zod_1 = require("zod");
exports.EApproveStatusVariants = zod_1.z.enum(['ONAPPROVAL', 'REFUSUAL', 'AGREED']);
