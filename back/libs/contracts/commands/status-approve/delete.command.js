"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusApproveDeleteCommand = void 0;
const zod_1 = require("zod");
const entity_url_param_command_1 = require("../common/entity-url-param.command");
const models_1 = require("../../models");
const StatusApproveDeleteResponseEntitySchema = models_1.StatusApproveSchema.pick({
    name: true,
    nameRu: true,
    comment: true,
    uuid: true,
    lastChangeByUserUuid: true,
    createdAt: true,
    updatedAt: true,
});
const StatusApproveDeleteResponseSchema = zod_1.z
    .object({
    data: StatusApproveDeleteResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var StatusApproveDeleteCommand;
(function (StatusApproveDeleteCommand) {
    StatusApproveDeleteCommand.RequestParamSchema = entity_url_param_command_1.EntityUrlParamCommand.RequestUuidParamSchema;
    StatusApproveDeleteCommand.ResponseSchema = StatusApproveDeleteResponseSchema;
    StatusApproveDeleteCommand.ResponseEntitySchema = StatusApproveDeleteResponseEntitySchema;
})(StatusApproveDeleteCommand || (exports.StatusApproveDeleteCommand = StatusApproveDeleteCommand = {}));