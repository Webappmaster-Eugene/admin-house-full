"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldTypeDeleteCommand = void 0;
const zod_1 = require("zod");
const entity_url_param_command_1 = require("../common/entity-url-param.command");
const models_1 = require("../../models");
const models_2 = require("../../models");
const FieldTypeDeleteResponseEntitySchema = models_1.FieldTypeSchema.pick({
    name: true,
    description: true,
    jsType: true,
    lastChangeByUserUuid: true,
    uuid: true,
});
const FieldTypeDeleteResponseSchema = zod_1.z
    .object({
    data: FieldTypeDeleteResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var FieldTypeDeleteCommand;
(function (FieldTypeDeleteCommand) {
    FieldTypeDeleteCommand.RequestParamSchema = entity_url_param_command_1.EntityUrlParamCommand.RequestUuidParamSchema;
    FieldTypeDeleteCommand.ResponseSchema = FieldTypeDeleteResponseSchema;
    FieldTypeDeleteCommand.ResponseEntitySchema = FieldTypeDeleteResponseEntitySchema;
})(FieldTypeDeleteCommand || (exports.FieldTypeDeleteCommand = FieldTypeDeleteCommand = {}));
