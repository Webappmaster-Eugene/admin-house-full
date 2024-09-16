"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponsiblePartnerProducerSchema = void 0;
const zod_1 = require("zod");
const enums_1 = require("../../enums");
exports.ResponsiblePartnerProducerSchema = zod_1.z.object({
    uuid: zod_1.z.string().uuid(),
    name: zod_1.z.string(),
    responsiblePartnerProducerStatus: enums_1.EActiveStatusVariants.nullish().default('ACTIVE'),
    numInOrder: zod_1.z.number().nullable().optional(),
    comment: zod_1.z.string().nullable().optional(),
    info: zod_1.z.string().nullable().optional(),
    email: zod_1.z.string().email().nullable().optional(),
    phone: zod_1.z.string().nullable().optional(),
    handbookUuid: zod_1.z.string().uuid(),
    lastChangeByUserUuid: zod_1.z.string().uuid().optional().nullable(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
