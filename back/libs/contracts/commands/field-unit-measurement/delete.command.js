"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldUnitMeasurementDeleteCommand = void 0;
const zod_1 = require("zod");
const entity_url_param_command_1 = require("../common/entity-url-param.command");
const models_1 = require("../../models");
const models_2 = require("../../models");
const FieldUnitMeasurementDeleteResponseSchema = zod_1.z
    .object({
    data: models_1.FieldUnitMeasurementSchema.pick({
        name: true,
        comment: true,
        uuid: true,
        handbookUuid: true,
        lastChangeByUserUuid: true,
    }),
})
    .merge(models_2.ResponseClientSchema);
var FieldUnitMeasurementDeleteCommand;
(function (FieldUnitMeasurementDeleteCommand) {
    FieldUnitMeasurementDeleteCommand.RequestParamSchema = entity_url_param_command_1.EntityUrlParamCommand.RequestUuidParamSchema;
    FieldUnitMeasurementDeleteCommand.ResponseSchema = FieldUnitMeasurementDeleteResponseSchema;
})(FieldUnitMeasurementDeleteCommand || (exports.FieldUnitMeasurementDeleteCommand = FieldUnitMeasurementDeleteCommand = {}));
