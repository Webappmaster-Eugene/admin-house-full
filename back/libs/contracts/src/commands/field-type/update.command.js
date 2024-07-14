"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldTypeUpdateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const field_type_business_value_schema_1 = require("../../models/field-type/field-type-business-value.schema");
const FieldTypeUpdateResponseEntitySchema = field_type_business_value_schema_1.FieldTypeBusinessValueSchema;
const FieldTypeUpdateRequestSchema = models_1.FieldTypeSchema.pick({
    description: true,
});
const FieldTypeUpdateResponseSchema = zod_1.z
    .object({
    data: FieldTypeUpdateResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var FieldTypeUpdateCommand;
(function (FieldTypeUpdateCommand) {
    FieldTypeUpdateCommand.RequestSchema = FieldTypeUpdateRequestSchema;
    FieldTypeUpdateCommand.ResponseSchema = FieldTypeUpdateResponseSchema;
    FieldTypeUpdateCommand.ResponseEntitySchema = FieldTypeUpdateResponseEntitySchema;
})(FieldTypeUpdateCommand || (exports.FieldTypeUpdateCommand = FieldTypeUpdateCommand = {}));
