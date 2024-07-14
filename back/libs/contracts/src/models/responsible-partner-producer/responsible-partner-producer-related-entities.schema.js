"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponsiblePartnerProducerRelatedEntitiesSchema = void 0;
const zod_1 = require("zod");
const handbook_business_value_schema_1 = require("../handbook/handbook-business-value.schema");
const material_business_value_schema_1 = require("../material/material-business-value.schema");
exports.ResponsiblePartnerProducerRelatedEntitiesSchema = zod_1.z.object({
    handbook: handbook_business_value_schema_1.HandbookBusinessValueSchema,
    materials: zod_1.z.array(material_business_value_schema_1.MaterialBusinessValueSchema).nullable().optional(),
});
