"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusApproveCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const StatusApproveCreateResponseEntitySchema = models_1.StatusApproveBusinessValueSchema;
const StatusApproveCreateRequestSchema = models_1.StatusApproveSchema.pick({
    name: true,
    nameRu: true,
    comment: true,
});
const StatusApproveCreateResponseSchema = zod_1.z
    .object({
    data: StatusApproveCreateResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var StatusApproveCreateCommand;
(function (StatusApproveCreateCommand) {
    StatusApproveCreateCommand.RequestSchema = StatusApproveCreateRequestSchema;
    StatusApproveCreateCommand.ResponseSchema = StatusApproveCreateResponseSchema;
    StatusApproveCreateCommand.ResponseEntitySchema = StatusApproveCreateResponseEntitySchema;
})(StatusApproveCreateCommand || (exports.StatusApproveCreateCommand = StatusApproveCreateCommand = {}));
