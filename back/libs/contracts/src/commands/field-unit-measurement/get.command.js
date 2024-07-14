"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldUnitMeasurementGetCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const field_unit_measurement_related_entities_schema_1 = require("../../models/field-unit-measurement/field-unit-measurement-related-entities.schema");
const field_unit_measurement_business_value_schema_1 = require("../../models/field-unit-measurement/field-unit-measurement-business-value.schema");
const FieldUnitMeasurementGetResponseEntitySchema = field_unit_measurement_business_value_schema_1.FieldUnitMeasurementBusinessValueSchema.merge(field_unit_measurement_related_entities_schema_1.FieldUnitMeasurementRelatedEntitiesSchema);
const FieldUnitMeasurementGetResponseSchema = zod_1.z
    .object({
    data: FieldUnitMeasurementGetResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var FieldUnitMeasurementGetCommand;
(function (FieldUnitMeasurementGetCommand) {
    FieldUnitMeasurementGetCommand.ResponseSchema = FieldUnitMeasurementGetResponseSchema;
    FieldUnitMeasurementGetCommand.ResponseEntitySchema = FieldUnitMeasurementGetResponseEntitySchema;
})(FieldUnitMeasurementGetCommand || (exports.FieldUnitMeasurementGetCommand = FieldUnitMeasurementGetCommand = {}));
