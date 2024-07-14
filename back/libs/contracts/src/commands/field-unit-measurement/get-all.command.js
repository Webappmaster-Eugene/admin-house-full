"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldUnitMeasurementGetAllCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const field_unit_measurement_related_entities_schema_1 = require("../../models/field-unit-measurement/field-unit-measurement-related-entities.schema");
const field_unit_measurement_business_value_schema_1 = require("../../models/field-unit-measurement/field-unit-measurement-business-value.schema");
const FieldUnitMeasurementGetAllResponseEntitySchema = zod_1.z.array(field_unit_measurement_business_value_schema_1.FieldUnitMeasurementBusinessValueSchema.merge(field_unit_measurement_related_entities_schema_1.FieldUnitMeasurementRelatedEntitiesSchema));
const FieldUnitMeasurementGetAllResponseSchema = zod_1.z
    .object({
    data: FieldUnitMeasurementGetAllResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var FieldUnitMeasurementGetAllCommand;
(function (FieldUnitMeasurementGetAllCommand) {
    FieldUnitMeasurementGetAllCommand.RequestQuerySchema = models_1.RequestGetAllQuerySchema;
    FieldUnitMeasurementGetAllCommand.ResponseSchema = FieldUnitMeasurementGetAllResponseSchema;
    FieldUnitMeasurementGetAllCommand.ResponseEntitySchema = FieldUnitMeasurementGetAllResponseEntitySchema;
})(FieldUnitMeasurementGetAllCommand || (exports.FieldUnitMeasurementGetAllCommand = FieldUnitMeasurementGetAllCommand = {}));
