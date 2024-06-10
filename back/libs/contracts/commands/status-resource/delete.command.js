"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusResourceDeleteCommand = void 0;
const zod_1 = require("zod");
const entity_url_param_command_1 = require("../common/entity-url-param.command");
const models_1 = require("../../models");
const models_2 = require("../../models");
const StatusResourceDeleteResponseEntitySchema = models_1.StatusResourceSchema.pick({
    name: true,
    comment: true,
    uuid: true,
    lastChangeByUserUuid: true,
    createdAt: true,
    updatedAt: true,
});
const StatusResourceDeleteResponseSchema = zod_1.z
    .object({
    data: StatusResourceDeleteResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var StatusResourceDeleteCommand;
(function (StatusResourceDeleteCommand) {
    StatusResourceDeleteCommand.RequestParamSchema = entity_url_param_command_1.EntityUrlParamCommand.RequestUuidParamSchema;
    StatusResourceDeleteCommand.ResponseSchema = StatusResourceDeleteResponseSchema;
    StatusResourceDeleteCommand.ResponseEntitySchema = StatusResourceDeleteResponseEntitySchema;
})(StatusResourceDeleteCommand || (exports.StatusResourceDeleteCommand = StatusResourceDeleteCommand = {}));
