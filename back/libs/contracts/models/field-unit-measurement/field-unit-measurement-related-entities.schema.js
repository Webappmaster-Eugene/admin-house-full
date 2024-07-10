"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldUnitMeasurementRelatedEntitiesSchema = void 0;
const zod_1 = require("zod");
const handbook_1 = require("../handbook");
exports.FieldUnitMeasurementRelatedEntitiesSchema = zod_1.z.object({
    handbook: handbook_1.HandbookBusinessValueSchema,
});
