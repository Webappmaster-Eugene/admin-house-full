"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldUnitMeasurementCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const field_unit_measurement_related_entities_schema_1 = require("../../models/field-unit-measurement/field-unit-measurement-related-entities.schema");
const field_unit_measurement_business_value_schema_1 = require("../../models/field-unit-measurement/field-unit-measurement-business-value.schema");
const FieldUnitMeasurementCreateRequestSchema = models_1.FieldUnitMeasurementSchema.pick({
    name: true,
    comment: true,
    fieldUnitMeasurementStatus: true,
});
const FieldUnitMeasurementCreateResponseEntitySchema = field_unit_measurement_business_value_schema_1.FieldUnitMeasurementBusinessValueSchema.merge(field_unit_measurement_related_entities_schema_1.FieldUnitMeasurementRelatedEntitiesSchema);
const FieldUnitMeasurementCreateResponseSchema = zod_1.z
    .object({
    data: FieldUnitMeasurementCreateResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var FieldUnitMeasurementCreateCommand;
(function (FieldUnitMeasurementCreateCommand) {
    FieldUnitMeasurementCreateCommand.RequestSchema = FieldUnitMeasurementCreateRequestSchema;
    FieldUnitMeasurementCreateCommand.ResponseSchema = FieldUnitMeasurementCreateResponseSchema;
    FieldUnitMeasurementCreateCommand.ResponseEntitySchema = FieldUnitMeasurementCreateResponseEntitySchema;
})(FieldUnitMeasurementCreateCommand || (exports.FieldUnitMeasurementCreateCommand = FieldUnitMeasurementCreateCommand = {}));
