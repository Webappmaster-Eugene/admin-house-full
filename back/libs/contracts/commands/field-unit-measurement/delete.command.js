"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldUnitMeasurementDeleteCommand = void 0;
const zod_1 = require("zod");
const entity_url_param_command_1 = require("../common/entity-url-param.command");
const models_1 = require("../../models");
const models_2 = require("../../models");
const FieldUnitMeasurementDeleteResponseEntitySchema = models_1.FieldUnitMeasurementBusinessValueSchema.merge(models_1.FieldUnitMeasurementRelatedEntitiesSchema);
const FieldUnitMeasurementDeleteResponseSchema = zod_1.z
    .object({
    data: FieldUnitMeasurementDeleteResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var FieldUnitMeasurementDeleteCommand;
(function (FieldUnitMeasurementDeleteCommand) {
    FieldUnitMeasurementDeleteCommand.RequestParamSchema = entity_url_param_command_1.EntityUrlParamCommand.RequestUuidParamSchema;
    FieldUnitMeasurementDeleteCommand.ResponseSchema = FieldUnitMeasurementDeleteResponseSchema;
    FieldUnitMeasurementDeleteCommand.ResponseEntitySchema = FieldUnitMeasurementDeleteResponseEntitySchema;
})(FieldUnitMeasurementDeleteCommand || (exports.FieldUnitMeasurementDeleteCommand = FieldUnitMeasurementDeleteCommand = {}));
