"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldUnitMeasurementDeleteCommand = void 0;
const zod_1 = require("zod");
const common_1 = require("../../commands/common");
const models_1 = require("../../models");
const field_unit_measurement_business_value_schema_1 = require("../../models/field-unit-measurement/field-unit-measurement-business-value.schema");
const field_unit_measurement_related_entities_schema_1 = require("../../models/field-unit-measurement/field-unit-measurement-related-entities.schema");
const FieldUnitMeasurementDeleteResponseEntitySchema = field_unit_measurement_business_value_schema_1.FieldUnitMeasurementBusinessValueSchema.merge(field_unit_measurement_related_entities_schema_1.FieldUnitMeasurementRelatedEntitiesSchema);
const FieldUnitMeasurementDeleteResponseSchema = zod_1.z
    .object({
    data: FieldUnitMeasurementDeleteResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var FieldUnitMeasurementDeleteCommand;
(function (FieldUnitMeasurementDeleteCommand) {
    FieldUnitMeasurementDeleteCommand.RequestParamSchema = common_1.EntityUrlParamCommand.RequestUuidParamSchema;
    FieldUnitMeasurementDeleteCommand.ResponseSchema = FieldUnitMeasurementDeleteResponseSchema;
    FieldUnitMeasurementDeleteCommand.ResponseEntitySchema = FieldUnitMeasurementDeleteResponseEntitySchema;
})(FieldUnitMeasurementDeleteCommand || (exports.FieldUnitMeasurementDeleteCommand = FieldUnitMeasurementDeleteCommand = {}));
