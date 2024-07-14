"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldUnitMeasurementRelatedEntitiesSchema = void 0;
const zod_1 = require("zod");
const handbook_business_value_schema_1 = require("../handbook/handbook-business-value.schema");
exports.FieldUnitMeasurementRelatedEntitiesSchema = zod_1.z.object({
    handbook: handbook_business_value_schema_1.HandbookBusinessValueSchema,
});
