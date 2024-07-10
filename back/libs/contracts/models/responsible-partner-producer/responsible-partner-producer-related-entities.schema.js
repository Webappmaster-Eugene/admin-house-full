"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponsiblePartnerProducerRelatedEntitiesSchema = void 0;
const zod_1 = require("zod");
const material_1 = require("../material");
const handbook_1 = require("../handbook");
exports.ResponsiblePartnerProducerRelatedEntitiesSchema = zod_1.z.object({
    handbook: handbook_1.HandbookBusinessValueSchema,
    materials: zod_1.z.array(material_1.MaterialBusinessValueSchema).nullable().optional(),
});
