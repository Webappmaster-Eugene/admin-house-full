"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldTypeDeleteCommand = void 0;
const zod_1 = require("zod");
const entity_url_param_command_1 = require("../common/entity-url-param.command");
const models_1 = require("../../models");
const field_type_business_value_schema_1 = require("../../models/field-type/field-type-business-value.schema");
const FieldTypeDeleteResponseEntitySchema = field_type_business_value_schema_1.FieldTypeBusinessValueSchema;
const FieldTypeDeleteResponseSchema = zod_1.z
    .object({
    data: FieldTypeDeleteResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var FieldTypeDeleteCommand;
(function (FieldTypeDeleteCommand) {
    FieldTypeDeleteCommand.RequestParamSchema = entity_url_param_command_1.EntityUrlParamCommand.RequestUuidParamSchema;
    FieldTypeDeleteCommand.ResponseSchema = FieldTypeDeleteResponseSchema;
    FieldTypeDeleteCommand.ResponseEntitySchema = FieldTypeDeleteResponseEntitySchema;
})(FieldTypeDeleteCommand || (exports.FieldTypeDeleteCommand = FieldTypeDeleteCommand = {}));
