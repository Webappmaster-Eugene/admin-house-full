"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponsiblePartnerProducerSchema = void 0;
const zod_1 = require("zod");
exports.ResponsiblePartnerProducerSchema = zod_1.z.object({
    uuid: zod_1.z.string().uuid(),
    name: zod_1.z.string(),
    comment: zod_1.z.string().nullable().optional(),
    info: zod_1.z.string().nullable().optional(),
    email: zod_1.z.string().nullable().optional(),
    phone: zod_1.z.string().nullable().optional(),
    handbookId: zod_1.z.string().uuid(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
