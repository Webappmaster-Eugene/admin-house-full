"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusApproveUpdateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const StatusApproveUpdateResponseEntitySchema = models_1.StatusApproveBusinessValueSchema;
const StatusApproveUpdateRequestSchema = models_1.StatusApproveSchema.pick({
    name: true,
    nameRu: true,
    comment: true,
}).partial();
const StatusApproveUpdateResponseSchema = zod_1.z
    .object({
    data: StatusApproveUpdateResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var StatusApproveUpdateCommand;
(function (StatusApproveUpdateCommand) {
    StatusApproveUpdateCommand.RequestSchema = StatusApproveUpdateRequestSchema;
    StatusApproveUpdateCommand.ResponseSchema = StatusApproveUpdateResponseSchema;
    StatusApproveUpdateCommand.ResponseEntitySchema = StatusApproveUpdateResponseEntitySchema;
})(StatusApproveUpdateCommand || (exports.StatusApproveUpdateCommand = StatusApproveUpdateCommand = {}));
